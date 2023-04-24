import  { redirect } from "@remix-run/node";
import { Link, Form, useActionData } from "@remix-run/react";
import { badRequest } from "~/utils/request.server";

function validateDob (dob) {
  console.log("DOB: ", dob);
  if (dob.trim() == "") {
    return "Please endter DOB in valid format (dd/mm/yyyy)";
  }
}
export const action = async ({ request }) => {
  const formData = await request.formData();
  
  const firstName = formData.get("firstName");
  const middleName = formData.get("middleName");
  const lastName = formData.get("lastName");
  const dateOfBirth = formData.get("dateOfBirth");

  const fieldErrors = {
    dateOfBirth: validateDob(dateOfBirth)
  };
  const fields = { dateOfBirth };
  if (Object.values(fieldErrors).some(Boolean)) {
    const err =  badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
    console.log("ERR: ", err);
    return err;
  }

  console.log({firstName, middleName, lastName});
  console.log("Student Record: ", JSON.stringify(Object.fromEntries(formData)));
  const response = await fetch('http://localhost:3000/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (response.ok) {
    return redirect('/admin/students/list');
  } else {
    return redirect('/admin/students/create', { status: 500 });
  }
};


export default function CreateStudent() {
  const actionData = useActionData();
  console.log("ActionData: ", actionData);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl mb-4">Create Student</h1>
      <Form  method="post" className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="firstName" className="block">First Name</label>
            <input type="text" id="firstName" name="firstName" className="w-full mt-1 border border-gray-300 px-2 py-1" />
          </div>
          <div>
            <label htmlFor="middleName" className="block">Middle Name</label>
            <input type="text" id="middleName" name="middleName" className="w-full mt-1 border border-gray-300 px-2 py-1" />
          </div>
          <div>
            <label htmlFor="lastName" className="block">Last Name</label>
            <input type="text" id="lastName" name="lastName" className="w-full mt-1 border border-gray-300 px-2 py-1" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="gender" className="block">Gender</label>
            <select id="gender" name="gender" className="w-full mt-1 border border-gray-300 px-2 py-1">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block">Date of Birth</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" className="w-full mt-1 border border-gray-300 px-2 py-1" />
            {actionData?.fieldErrors?.dateOfBirth ? (
                <p
                  className="form-validation-error"
                  id="dob-error"
                  role="alert"
                >
                  {actionData.fieldErrors.dateOfBirth}
                </p>
              ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="primaryAddress" className="block">Primary Address</label>
          <textarea id="primaryAddress" name="primaryAddress" className="w-full mt-1 border border-gray-300 px-2 py-1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block">City</label>
            <input type="text" id="city" name="city" className="w-full mt-1 border border-gray-300 px-2 py-1" />
          </div>
          <div>
            <label htmlFor="state" className="block">State</label>
            <input type="text" id="state" name="state" className="w-full mt-1 border border-gray-300 px-2 py-1" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block">Country</label>
            <input type="text" id="country" name="country" className="w-full mt-1 border border-gray-300 px-2 py-1" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="fathersName" className="block">Father's Name</label>
            <input type="text" id="fathersName" name="fathersName" className="w-full mt-1 border border-gray-300 px-2 py-1" />
          </div>
          <div>
            <label htmlFor="mothersName" className="block">Mother's Name</label>
            <input type="text" id="mothersName" name="mothersName" className="w-full mt-1 border border-gray-300 px-2 py-1" />
          </div>
          <div>
            <label htmlFor="guardianName" className="block">Guardian Name</label>
            <input type="text" id="guardianName" name="guardianName" className="w-full mt-1 border border-gray-300 px-2 py-1" />
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

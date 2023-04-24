// app/routes/admin/student.tsx
import { useParams, LinksFunction, LoaderFunction, useLoaderData } from '@remix-run/react';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: '/styles.css' }];
};

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/students/${params.id}`);
  const student = await res.json();
  return student;
};

export default function Student() {
  const { id } = useParams();
  const student = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-5">
      <h1 className="text-2xl mb-5">Student Details</h1>
      <div className="border border-gray-300 p-4">
        <h2 className="text-lg mb-2">
          {student.firstName} {student.middleName} {student.lastName}
        </h2>
        <p>ID: {id}</p>
        <p>Date of Birth: {new Date(student.dateOfBirth).toLocaleDateString()}</p>
        <p>Gender: {student.gender}</p>
        <p>Father's Name: {student.fathersName}</p>
        <p>Mother's Name: {student.mothersName}</p>
        <p>Guardian's Name: {student.guardianName}</p>
        <p>Address: {student.address}</p>
        <p>City: {student.city}</p>
        <p>State: {student.state}</p>
        <p>Country: {student.country}</p>
      </div>
    </div>
  );
}

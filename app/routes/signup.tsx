// app/routes/signup.tsx
import { Form, useActionData } from '@remix-run/react';
import  { redirect } from "@remix-run/node";

import type { LoaderFunction, ActionFunction } from '@remix-run/react';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const body = {};

  for (const [key, value] of formData.entries()) {
    body[key] = value;
  }

  const response = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    console.log("Redirecting to login...");
    throw redirect('/login');
  }

  const errorMessage = await response.json();
  console.log("ERROR: ", errorMessage);
  return errorMessage;
  //return redirect('/signup', { status: 400, headers: { 'error-message': errorMessage.message } });
};

function SignupPage() {
  const actionData = useActionData();
  console.log("ActionData: ", actionData);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <Form
          action="/signup"
          method="post"
          className="mt-8 space-y-6"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            
            <div>
              <label htmlFor="username" className="sr-only">
                Email address
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
          {actionData && <h4 className="text-red-600">User already exists!</h4>}
        </Form>
      </div>
    </div>
  );
}

export default SignupPage;

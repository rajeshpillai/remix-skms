// app/routes/admin/students.tsx
import { Link, LoaderFunction, useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
  const res = await fetch('http://localhost:3000/api/students');
  const students = await res.json();
  return students;
};

export default function Students() {
  const students = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-5">
      <h1 className="text-2xl mb-5">Students List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Date of Birth</th>
            <th className="border border-gray-300 p-2">Gender</th>
            <th className="border border-gray-300 p-2">City</th>
            <th className="border border-gray-300 p-2">State</th>
            
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border border-gray-300 p-2">{student.id}</td>
              <td className="border border-gray-300 p-2">
                {student.firstName} {student.middleName} {student.lastName}
              </td>
              <td className="border border-gray-300 p-2">{new Date(student.dateOfBirth).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">{student.gender}</td>
              <td className="border border-gray-300 p-2">{student.city}</td>
              <td className="border border-gray-300 p-2">{student.state}</td>
              <td className="border border-gray-300 p-2">
                <Link to={`/admin/students/${student.id}`} className="inline-block bg-blue-500 text-white px-4 py-1 rounded">
                  Show
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

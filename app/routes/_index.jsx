import  { LinksFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";


export default function IndexRoute() {
  return (
    <>
      <div class="min-h-screen flex items-center justify-center flex-col">
        <div class="text-2xl text-blue-500 mb-4">
          Welcome to the SKMS
        </div>
        <div class="text-sm text-gray-600">
          This remix app is under development!
        </div>
      </div>

      <Outlet/>
    </>
  );
}
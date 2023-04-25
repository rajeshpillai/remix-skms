import  { LinksFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";


export default function IndexRoute() {
  return (
    <div className="text-4xl font-bold  mb-6">
      <h1>SKMS</h1>
      <Outlet/>
    </div>
  );
}
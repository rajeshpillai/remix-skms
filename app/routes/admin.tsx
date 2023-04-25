import { Outlet } from "@remix-run/react";
import Navbar from "~/components/navbar";

export default function () {
  return (
    <div>
      <Outlet />
    </div>
  )
}
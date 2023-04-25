import type {LinksFunction, LoaderArgs} from "@remix-run/node";
import { Outlet, Form, useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";

import Navbar from "~/components/navbar";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";


export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);
  console.log("User: ", user);
  return json({ user });
};


export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <div>
        {data.user ? (
              <div className="user-info">
                <span>{`Hi ${data.user.username}`}</span>
                <Form action="/logout" method="post">
                  <button type="submit" className="button">
                    Logout
                  </button>
                </Form>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
      </div>
      <Outlet />
    </div>
  )
}
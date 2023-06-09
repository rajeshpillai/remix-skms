import type { LinksFunction, MetaFunction } from "@remix-run/node";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import reset from "@unocss/reset/tailwind.css";

import uno from "~/styles/uno.css";
import Navbar from "./components/navbar";

export const links: LinksFunction = () => ([
  { rel: "stylesheet", href: reset },
  { rel: "stylesheet", href: uno },
]);

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "SKMS",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
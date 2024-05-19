import { MetaFunction, redirect } from "@remix-run/react";

import { isLoggedIn } from "~/lib/pocketbase.client";

import { ComingSoon } from "~/components/coming-soon";


export const meta: MetaFunction = () => {
  return [
    { title: "My Messages" },
    { name: "description", content: "My messages" },
  ];
};

export async function clientLoader() {
  if (!isLoggedIn()) {
    return redirect("/auth")
  }

  return null
}

export default function RouteComponent() {
  return (
    <div>
      <ComingSoon />
    </div>
  );
}
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Authenticate" },
    { name: "description", content: "Authenticate to continue" },
  ];
};
export default function RouteComponent() {
  return (
    <div>
      auth
    </div>
  );
}
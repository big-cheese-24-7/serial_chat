import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Chat Members" },
    { name: "description", content: "Serial chat members" },
  ];
};
export default function RouteComponent() {
  return (
    <div>
      members
    </div>
  );
}
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "My Messages" },
    { name: "description", content: "My messages" },
  ];
};
export default function RouteComponent() {
  return (
    <div>
      my messages
    </div>
  );
}
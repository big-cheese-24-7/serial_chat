import "~/tailwind.css"
import '@fontsource-variable/mulish';

import { ThemeProvider } from "~/components/theme-provider";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/serial-chat-logo.svg" />
        <style>

        </style>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Outlet />
    </ThemeProvider>
  )
}

export function HydrateFallback() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" className="h-24 w-24 lg:h-40 lg:w-40"
      ><path
        fill="none"
        stroke="#FF156D"
        strokeWidth="15"
        strokeLinecap="round"
        strokeDasharray="300 385"
        strokeDashoffset="0"
        d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
        className="stroke-primary"
      ><animate
        attributeName="stroke-dashoffset"
        calcMode="spline"
        dur="2"
        values="685;-685"
        keySplines="0 0 1 1"
        repeatCount="indefinite"
      ></animate>
        </path>
      </svg>
    </div>
  )
}

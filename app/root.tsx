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
import { Toaster } from "./components/ui/sonner";
import { LoadingPage } from "./components/loading/loading-page";

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
      <Toaster richColors position="bottom-center" />
      <Outlet />
    </ThemeProvider>
  )
}

export function HydrateFallback() {
  return (
    <LoadingPage />
  )
}

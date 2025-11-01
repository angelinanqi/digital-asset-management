'use client'; //treat this file as client component to hydrate the layout properly
import { Provider } from "@/styles/ui/provider";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

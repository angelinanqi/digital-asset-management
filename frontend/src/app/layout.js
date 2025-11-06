"use client"; //treat this file as client component to hydrate the layout properly
import { Provider as UIProvider } from "@/styles/ui/provider";
import { Toaster } from "@/styles/ui/toaster";
import "../styles/globals.css";

import { store } from '@/app/store.js';
import { Provider as ReduxProvider } from 'react-redux';

import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          type='module'
          src='https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js'
        />

        <ReduxProvider store={store}>
          <UIProvider>
            {children}
            <Toaster />
          </UIProvider>

        </ReduxProvider>

      </body>
    </html>
  );
}

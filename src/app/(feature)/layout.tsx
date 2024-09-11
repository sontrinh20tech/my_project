"use client";

import TanStackQueryProvider from "@/components/TanStackQueryProvider";
import { SiderbarProvider } from "@/context/SiderbarContext";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TanStackQueryProvider>
        <SiderbarProvider>
          {children}
        </SiderbarProvider>
      </TanStackQueryProvider>
    </>
  );
}

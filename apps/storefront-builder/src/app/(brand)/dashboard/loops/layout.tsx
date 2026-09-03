// app/layout.tsx
import { LoopsProvider } from "@/provider/LoopsProvider";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LoopsProvider>{children}</LoopsProvider>;
}

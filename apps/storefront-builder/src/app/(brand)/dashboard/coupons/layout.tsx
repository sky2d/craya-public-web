// app/layout.tsx
import { CouponProvider } from "@/provider/CouponProvider";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CouponProvider>{children}</CouponProvider>;
}

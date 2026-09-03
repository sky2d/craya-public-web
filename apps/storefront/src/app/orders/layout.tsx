import { SessionAuthForNextJS } from "@/components/auth/SessionAuthForNextJS";
import { Loader } from "@/utils/loader";
import { Suspense } from "react";

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <SessionAuthForNextJS>{children}</SessionAuthForNextJS>
      </Suspense>
    </>
  );
}

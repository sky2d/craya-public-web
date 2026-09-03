"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Session from "supertokens-auth-react/recipe/session";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const hasSession = await Session.doesSessionExist();
      if (hasSession) {
        window.location.href = "/dashboard";
      }
    };
    checkSession();
  }, [router]);

  return <>{children}</>;
};

export default AuthLayout;

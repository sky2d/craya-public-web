"use client";

import { frontendConfig, setRouter } from "@/config/frontend";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

if (typeof window !== "undefined") {
  SuperTokensReact.init(frontendConfig());
}

export const SuperTokensProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Ensure both router and pathname are available
    if (router && pathname) {
      setRouter(router, pathname);
    }
  }, [router, pathname]);

  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};

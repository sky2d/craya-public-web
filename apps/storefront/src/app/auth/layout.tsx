"use client";

import { getFromParamOrCookie } from "components/src/utils/domain";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Session from "supertokens-auth-react/recipe/session";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const hasSession = await Session.doesSessionExist();
      if (!hasSession) return;

      const previousUrl = getFromParamOrCookie();

      if (previousUrl && previousUrl !== window.location.href) {
        try {
          const isCrossDomain = new URL(previousUrl).hostname !== window.location.hostname;

          if (isCrossDomain) {
            window.location.href = previousUrl;
          } else {
            router.push(previousUrl);
          }
        } catch (err) {
          router.back();
        }
      } else {
        router.back();
      }
    };

    checkSession();
  }, [router]);

  return <>{children}</>;
};

export default AuthLayout;

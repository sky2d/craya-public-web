import { useRouter } from "next/navigation";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";
import ThirdParty, { Google } from "supertokens-auth-react/recipe/thirdparty";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } = {};

export function setRouter(router: ReturnType<typeof useRouter>, pathName: string) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo: {
      appName: "Kraya Storefront Builder",
      apiDomain: process.env.NEXT_PUBLIC_WEB_DOMAIN || "http://localhost:3000",
      websiteDomain: process.env.NEXT_PUBLIC_WEB_DOMAIN || "http://localhost:3000",
      apiBasePath: "/auth",
      websiteBasePath: "/auth",
    },
    recipeList: [
      Passwordless.init({
        contactMethod: "PHONE",
      }),

      ThirdParty.init({
        signInAndUpFeature: {
          providers: [Google.init()],
        },
      }),
      Session.init({
        tokenTransferMethod: "cookie",
      }),
    ],
  };
};

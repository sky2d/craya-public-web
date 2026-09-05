import { getEnvConfig } from "components/src/utils/env/envConfig";
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
  const { appName, websiteDomain, apiDomain, sessionTokenFrontendDomain } = {
    ...getEnvConfig(),
    appName: "Craya Storefront",
  };

  return {
    appInfo: {
      appName,
      apiDomain,
      websiteDomain,
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
        sessionTokenFrontendDomain,
      }),
    ],
  };
};

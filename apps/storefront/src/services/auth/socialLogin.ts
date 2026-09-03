import { showPopup } from "components/src/minor";
import { getEnvConfig } from "components/src/utils/env/envConfig";
import { getAuthorisationURLWithQueryParamsAndSetState } from "supertokens-web-js/recipe/thirdparty";

export async function GoogleSignInClicked() {
  const { websiteDomain } = getEnvConfig();
  try {
    const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
      thirdPartyId: "google",
      frontendRedirectURI: `${websiteDomain}/auth/callback/google`,
    });

    window.location.assign(authUrl);
  } catch (e) {
    const err = e as Error;
    if (err.message) {
      showPopup("error", err.message);
    } else {
      showPopup("error", "Something went wrong.");
    }
  }
}

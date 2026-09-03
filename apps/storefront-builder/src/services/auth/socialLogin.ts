import { showPopup } from "components/src/minor";
import { getAuthorisationURLWithQueryParamsAndSetState } from "supertokens-web-js/recipe/thirdparty";

export async function GoogleSignInClicked() {
  try {
    const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
      thirdPartyId: "google",
      frontendRedirectURI: `${process.env.NEXT_PUBLIC_WEB_DOMAIN}/auth/callback/google`,
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

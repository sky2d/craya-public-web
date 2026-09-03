import { navigateToPath } from "components/src/utils/domain";
import Session from "supertokens-web-js/recipe/session";

export async function logout() {
  await Session.signOut();
  // window.location.href = `${webDomain}/auth`;
  navigateToPath("/auth");
}

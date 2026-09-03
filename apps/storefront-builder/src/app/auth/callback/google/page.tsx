"use client";

import { showPopup } from "components/src/minor";
import { LoadingBar } from "components/src/minor/LoadingBar";
import { useEffect, useState } from "react";
import Session from "supertokens-web-js/recipe/session";
import { signInAndUp } from "supertokens-web-js/recipe/thirdparty";

async function handleGoogleCallback() {
  try {
    const response = await signInAndUp();
    if (await Session.doesSessionExist()) {
      window.location.href = "/dashboard";
    } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      showPopup("error", response.reason);
      if (response.reason === "This email account is not authorized.") {
        window.location.assign("https://form.jotform.com/251038220051036");
      } else window.location.assign(`process.env.NEXT_PUBLIC_BASE_URL + "/auth`);
    } else {
      showPopup("error", " Use another form of login");
      window.location.assign("/auth");
    }
  } catch (e) {
    const err = e as Error;
    showPopup("error", err.message);
    window.location.assign("/");
  }
}
const GoogleCallback = () => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!flag) {
      handleGoogleCallback();
      setFlag(true);
    }
  }, [flag]);

  return (
    <div>
      <LoadingBar />
    </div>
  );
};

export default GoogleCallback;

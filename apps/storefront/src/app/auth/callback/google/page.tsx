"use client";

import { Loader } from "@/utils/loader";
import { showPopup } from "components/src/minor";
import { getFromParamOrCookie } from "components/src/utils/domain";
import { useEffect, useState } from "react";
import { signInAndUp } from "supertokens-auth-react/recipe/thirdparty";

async function handleGoogleCallback({ from }: { from: string | null }) {
  try {
    const response = await signInAndUp();

    if (response.status === "OK") {
      if (from) {
        window.location.assign(decodeURIComponent(from));
      } else {
        window.location.assign("/");
      }
    } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      showPopup("error", response.reason);
    } else {
      showPopup("error", "No email provided by Google. Please use another form of login");
      window.location.assign("/auth");
    }
  } catch (e) {
    const err = e as Error;
    showPopup("error", err.message);
  }
}

const GoogleCallback = () => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!flag) {
      const from = getFromParamOrCookie();
      handleGoogleCallback({ from });
      setFlag(true);
    }
  }, [flag]);

  return <Loader />;
};

export default GoogleCallback;

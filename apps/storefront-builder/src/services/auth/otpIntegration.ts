import { showPopup } from "components/src/minor";
import { verifyOTP } from "components/src/services/api/verifyOTP";

interface OTPConfig {
  widgetId: string | "";
  tokenAuth: string | "";
  identifier?: string;
  exposeMethods?: boolean;
  captchaRenderId?: string;
  //   success: (data: string) => void;
  //   failure: (error: string) => void;
}

declare global {
  interface Window {
    initSendOTP?: (config: OTPConfig) => void;
    sendOtp?: (mobile: string, onSuccess: (data: OtpResponseType) => void, onError: (error: OtpResponseType) => void) => void;
    verifyOtp?: (otp: string, onSuccess: (data: OtpResponseType) => void, onError: (error: OtpResponseType) => void) => void;
    retryOtp: (otp: string, onSuccess: (data: OtpResponseType) => void, onError: (error: OtpResponseType) => void) => void;
  }
}

export interface OtpResponseType {
  message: string;
  type: string;
}

export const loadOtpSdk = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.sendOtp) {
      resolve();
      return;
    }

    const scriptId = "otp-sdk-script";
    if (document.getElementById(scriptId)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://control.msg91.com/app/assets/otp-provider/otp-provider.js";
    script.async = true;

    script.onload = () => {
      if (window.initSendOTP) {
        const configuration = {
          widgetId: process.env.NEXT_PUBLIC_OTP_WIDGET_ID || "",
          tokenAuth: process.env.NEXT_PUBLIC_OTP_TOKEN || "",
          identifier: "",
          exposeMethods: true,
          captchaRenderId: "captcha-container",
          success: () => {},
          failure: () => {},
        };

        window.initSendOTP(configuration);

        // ⏳ Wait for `window.sendOtp` to be available
        const checkSendOtp = setInterval(() => {
          if (window.sendOtp) {
            clearInterval(checkSendOtp);
            resolve();
          }
        }, 500); // Checks every 500ms
      } else {
        reject(new Error("❌ `initSendOTP` not found after script load"));
      }
    };

    script.onerror = () => reject(new Error("❌ Failed to load OTP SDK"));

    document.body.appendChild(script);
  });
};

export const OtpVerification = async (otpResponse: OtpResponseType, phoneNumber: string, setOtpVerifying: (value: boolean) => void) => {
  const formattedPhoneNumber = `+${phoneNumber}`;

  try {
    setOtpVerifying(true);
    const { data, error } = await verifyOTP(otpResponse.message, formattedPhoneNumber);
    if (data) {
      showPopup("success", "OTP verified");
      window.location.href = "/dashboard";
    }
    if (error) {
      setOtpVerifying(false);
      showPopup("error", error);
      if (error === "This phone number is not whitelisted") {
        window.location.assign("https://form.jotform.com/251038220051036");
      }
    }
  } catch (error) {
    setOtpVerifying(false);
    showPopup("error", `OTP verification failed, ${error}`);
  }
};

export const resendOTP = () => {
  window.retryOtp(
    "11",
    () => showPopup("success", "Otp send to mobile"), // optional
    error => showPopup("error", error.message), // optional
    //  "336870744532313134323444", // optional
  );
};

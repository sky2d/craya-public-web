"use client";

import LoginCard from "@/components/login/LoginCard";
import OTPCard from "@/components/login/OTPCard";
import { loadOtpSdk, OtpResponseType } from "@/services/auth/otpIntegration";
import { showPopup } from "components/src/minor";
import { useState } from "react";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async (mobile: string) => {
    setLoading(true);
    try {
      await loadOtpSdk(); // ✅ Waits for SDK to load **AND** `sendOtp` to be available
      if (!window.sendOtp) return;

      window.sendOtp(
        `91${mobile}`,
        () => {
          showPopup("success", "Otp sent");
          setCurrentPage("otp");
        },
        (error: OtpResponseType) => {
          showPopup("error", error.message || "try again");
        },
      );
    } catch (error) {
      console.error("❌ Error initializing OTP SDK:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeMobileNumber = () => {
    setLoading(false);
    setCurrentPage("login");
  };

  const handleLoginSubmit = async (number: string) => {
    setMobileNumber(`91${number}`);
    try {
      await sendOTP(number);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-brand-color3">
      {currentPage === "login" && <LoginCard onSubmit={handleLoginSubmit} loading={loading} />}
      {currentPage === "otp" && <OTPCard mobileNumber={mobileNumber} onChangeMobileNumber={handleChangeMobileNumber} />}
    </div>
  );
};

export default App;

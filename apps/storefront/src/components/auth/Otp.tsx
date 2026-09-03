"use client";

import { OtpVerification, resendOTP } from "@/services/auth/otpIntegration";
import OtpImage from "components/src/icons/iconFiles/OtpLogo.svg";
import { showPopup } from "components/src/minor";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import OtpCard from "./VerifyOtpCard";

interface OTPCardProps {
  mobileNumber: string;
  onChangeMobileNumber: () => void;
}

const Otp: React.FC<OTPCardProps> = ({ mobileNumber, onChangeMobileNumber }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const handleSubmit = async (otp: string[], event: React.FormEvent) => {
    event.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      showPopup("error", "Please enter a 6-digit OTP.");
      return;
    }

    setError("");

    if (!window.verifyOtp) {
      return showPopup("error", "OTP service not available.");
    }

    await window.verifyOtp(
      enteredOtp,
      async data => {
        const verificationResult = await OtpVerification(data, mobileNumber);
        if (verificationResult) {
          showPopup("success", "OTP successfully verified.");
          if (from) {
            window.location.href = decodeURIComponent(from);
          } else {
            const prevPath = document.referrer;
            if (prevPath && prevPath !== window.location.href) {
              router.back();
            } else {
              router.push("/");
            }
          }
        } else {
          showPopup("error", "OTP verification failed.");
        }
      },
      error => showPopup("error", error.message),
    );
  };
  return (
    <div className="container flex h-full min-h-screen flex-col items-center justify-center bg-brand-color3">
      <div className="relative mb-5 flex aspect-square w-32 justify-center md:w-[10vw]">
        <Image draggable={false} src={OtpImage} fill alt="Logo" className="w-full" />
      </div>
      <OtpCard
        errorMessage={error || ""}
        mobileNumber={mobileNumber}
        resendOTP={resendOTP}
        handleSubmit={handleSubmit}
        onChangeMobileNumber={onChangeMobileNumber}
      />
    </div>
  );
};

export default Otp;

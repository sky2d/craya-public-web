"use client";

import { OtpVerification, resendOTP, sendOTP } from "@/services/auth/otpIntegration";
import CrayoLogo from "components/src/icons/iconFiles/krayaSvg/BLACK_1.svg";
import { BaseModal } from "components/src/major/BaseModal";
import { showPopup } from "components/src/minor";
import { navigateToPath } from "components/src/utils/domain";
import Image, { StaticImageData } from "next/image";
import { FC, useState } from "react";
import LoginCard from "../auth/LoginCard";
import OtpCard from "../auth/VerifyOtpCard";

interface AddedToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginImage: StaticImageData;
}

export const LoginInSignUpModel: FC<AddedToCartModalProps> = ({ isOpen, onClose, loginImage }) => {
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState("login");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const regex = /^\d{10}$/;

    if (regex.test(value)) {
      setError("");
    } else {
      setError("Invalid number format.");
    }
    setMobileNumber(value);
  };

  const handleSubmit = async () => {
    if (!error && mobileNumber) {
      setMobileNumber(`91${mobileNumber}`);
      setLoading(true);
      try {
        await sendOTP({
          mobile: mobileNumber,
          onSuccess: () => setCurrentPage("otp"),
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangeMobileNumber = () => {
    setLoading(false);
    setCurrentPage("login");
  };

  const handelGoogleLogin = () => {
    navigateToPath("/auth");
  };

  const handleSubmitOtp = async (otp: string[], event: React.FormEvent) => {
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
          onClose();
        } else {
          showPopup("error", "OTP verification failed.");
        }
      },
      error => showPopup("error", error.message),
    );
  };
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="overflow-y-auto rounded-xl"
      borderRadius="12px"
      padding="0"
      width={{
        xs: "90%",
        lg: "80%",
        xl: "70%",
      }}
    >
      <div className="flex h-full w-full flex-col sm:flex-row">
        <div className="relative hidden h-[80vh] w-full max-w-[50%] flex-grow bg-brand-color2 md:flex">
          <Image
            draggable={false}
            src={loginImage}
            alt="Login/Sign Up Banner"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex w-full flex-grow flex-col items-center justify-start sm:w-1/2">
          <div className="relative hidden h-20 w-full sm:w-1/2 md:flex">
            <Image
              draggable={false}
              src={CrayoLogo}
              alt="Item has been added to cart"
              className="object-contain"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          {currentPage === "login" && (
            <LoginCard
              mobileNumber={mobileNumber}
              error={error}
              loading={loading}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              handelGoogleLogin={handelGoogleLogin}
            />
          )}
          {currentPage === "otp" && (
            <OtpCard
              errorMessage={error || ""}
              handleSubmit={handleSubmitOtp}
              mobileNumber={mobileNumber}
              resendOTP={resendOTP}
              onChangeMobileNumber={handleChangeMobileNumber}
            />
          )}
        </div>
      </div>
    </BaseModal>
  );
};

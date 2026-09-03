"use client";

import { OtpVerification, resendOTP } from "@/services/auth/otpIntegration";
import Otp from "components/src/icons/iconFiles/OtpLogo.svg";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2, showPopup } from "components/src/minor";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface OTPCardProps {
  mobileNumber: string;
  onChangeMobileNumber: () => void;
}

const OTPCard: React.FC<OTPCardProps> = ({ mobileNumber, onChangeMobileNumber }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;

    if (regex.test(value)) {
      setError("");
      setOtp(otp => {
        const temp = [...otp];
        temp[index] = value;
        return temp;
      });
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      setOtp(otp => {
        const temp = [...otp];
        temp[index] = "";
        return temp;
      });
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "Enter") {
      const enteredOtp = otp.join("");
      if (enteredOtp.length === 6) {
        if (!window.verifyOtp) return;
        window.verifyOtp(
          enteredOtp, // OTP value
          data => OtpVerification(data, mobileNumber, setIsOtpVerifying),
          error => showPopup("error", error.message),
        );
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredOtp = otp.join("");
    if (!window.verifyOtp) return showPopup("error", "OTP not sent");
    window.verifyOtp(
      enteredOtp, // OTP value
      data => OtpVerification(data, mobileNumber, setIsOtpVerifying), // optional
      error => showPopup("error", error.message), // optional
    );
  };
  const isOtpComplete = otp.every(value => value !== "");

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center bg-brand-color3">
      <div className="my-14 flex justify-center">
        <Image src={Otp} alt="Logo" width={80} height={80} />
      </div>
      <div className="container flex w-full justify-center px-4">
        <div className="w-full max-w-lg rounded-[32px] bg-white-light4 p-8 shadow-lg">
          <h1 className="mb-4 text-center text-4xl font-bold text-brand-color1">OTP Verification</h1>
          <p className="text-1xl mb-8 text-center text-black-dark1">
            Enter the OTP sent to <strong>{`+${mobileNumber}`}</strong>
          </p>
          <form className="my-8" onSubmit={handleSubmit}>
            <div className="mb-4 flex justify-center gap-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  ref={input => {
                    inputRefs.current[index] = input;
                  }}
                  value={value}
                  onChange={e => handleInputChange(index, e)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  className="h-10 w-10 rounded-lg border-2 bg-white-light4 text-center text-3xl text-black-dark3 sm:h-12 sm:w-12 md:h-16 md:w-16"
                  maxLength={1}
                />
              ))}
            </div>
            <div className="h-[18px]">{error && <p className="mb-4 text-center text-sm text-red-500">{error}</p>}</div>
          </form>
          <p className="text-md mb-4 text-center text-black-dark1">
            {"Didn't receive the OTP?"}
            <strong className="cursor-pointer border-b-2 border-brand-color3 text-brand-color1" onClick={resendOTP}>
              Resend OTP
            </strong>
          </p>
          <p className="text-1xl mb-8 text-center font-bold text-brand-color1">
            <span className="cursor-pointer" onClick={onChangeMobileNumber}>
              Change Mobile Number
            </span>
          </p>
          <div className="mt-4 text-center">
            <Button2 label="Verify" type={ButtonType.PRIMARY} handleClick={handleSubmit} disabled={!isOtpComplete || isOtpVerifying} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPCard;

import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import React, { useRef, useState } from "react";

interface OTPVerificationProps {
  mobileNumber: string;
  resendOTP: () => void;
  onChangeMobileNumber: () => void;
  handleSubmit: (otp: string[], event: React.FormEvent) => Promise<void>;
  errorMessage: string;
}

const OtpCard: React.FC<OTPVerificationProps> = ({ mobileNumber, resendOTP, errorMessage, handleSubmit, onChangeMobileNumber }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [error, setError] = useState(errorMessage);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;

    if (regex.test(value)) {
      setError("");
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        setOtp(prevOtp => {
          const temp = [...prevOtp];
          temp[index - 1] = "";
          return temp;
        });
        inputRefs.current[index - 1]?.focus();
      } else {
        setOtp(prevOtp => {
          const temp = [...prevOtp];
          temp[index] = "";
          return temp;
        });
      }
    } else if (e.key === "Enter") {
      handleSubmit(otp, { preventDefault: () => {} } as React.FormEvent);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const isOtpComplete = otp.every(value => value !== "" && /^[0-9]$/.test(value));

  return (
    <div className="container flex w-full justify-center px-4">
      <div className="w-full max-w-lg rounded-[32px] bg-white-light4 p-4 shadow-lg">
        <h1 className="mb-4 text-center text-4xl font-bold text-brand-color1">OTP Verification</h1>
        <p className="text-1xl mb-8 text-center text-black-dark1">
          Enter the OTP sent to <strong>{`+${mobileNumber}`}</strong>
        </p>
        <form
          className="my-8"
          onSubmit={event => {
            event.preventDefault();
            handleSubmit(otp, event);
          }}
        >
          <div className="mb-4 flex justify-center gap-1">
            {otp.map((value, index) => (
              <input
                key={index}
                inputMode="numeric"
                pattern="[0-9]*"
                ref={input => {
                  inputRefs.current[index] = input;
                }}
                value={value}
                onChange={e => handleInputChange(index, e)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="aspect-square min-w-[40px] max-w-[60px] flex-1 rounded-lg border-2 bg-white-light4 text-center text-3xl text-black-dark3"
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
          <Button2 label="Verify" type={ButtonType.PRIMARY} handleClick={event => handleSubmit(otp, event)} disabled={!isOtpComplete} />
        </div>
      </div>
    </div>
  );
};

export default OtpCard;

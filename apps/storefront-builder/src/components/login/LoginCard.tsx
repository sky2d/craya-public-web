"use client";

import { GoogleSignInClicked } from "@/services/auth/socialLogin";
import GoogleIcon from "components/src/icons/iconFiles/GoogleIcon.svg";
import WhiteLogo from "components/src/icons/iconFiles/WhiteLogo.svg";
import { InputFieldType } from "components/src/interfaces/InputField";
import { InputField2, Loading } from "components/src/minor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
interface LoginCardProps {
  loading: boolean;
  onSubmit: (mobileNumber: string) => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onSubmit, loading }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleSubmit = () => {
    if (!error && mobileNumber) {
      onSubmit(mobileNumber);
    }
  };

  const handelGoogleLogin = () => {
    GoogleSignInClicked();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-color3">
      <div className="my-10">
        <Image src={WhiteLogo} alt="Logo" height={350} width={350} />
      </div>
      <div className="flex w-full justify-center px-4">
        <div className="w-full max-w-lg rounded-[32px] bg-white-light4 p-8 shadow-lg sm:w-[572px]">
          <h1 className="my-8 text-center text-4xl font-bold text-brand-color1">Sign in</h1>
          <div className="mb-4">
            <div className="mb-8 mt-12 h-[72px]">
              <InputField2
                className="h-14"
                type={InputFieldType.TELEPHONE}
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={handleInputChange}
                errorMessage={error}
                iconPosition="right"
                icon={loading ? <Loading /> : <BsArrowRightCircleFill className="h-12 w-12 text-brand-color1" />}
                onIconClick={loading ? () => {} : handleSubmit}
                onSubmit={handleSubmit}
              />
            </div>
            <div className="relative flex items-center">
              <div className="flex-grow border-[1px] border-brand-color3"></div>
              <span className="mx-4 text-brand-color3">OR</span>
              <div className="flex-grow border-[1px] border-brand-color3"></div>
            </div>
          </div>
          <div className="text-center">
            <button className="mt-2 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={handelGoogleLogin}>
              <Image src={GoogleIcon} alt="Google Icon" width={68} height={68} />
            </button>
            <div className="">
              <p className="text-center text-sm text-black-dark3">
                By logging in, you agree to our{" "}
                <span className="text-brand-color1 hover:border-b">
                  <button
                    onClick={() => {
                      router.push("/terms");
                    }}
                  >
                    Terms and conditions
                  </button>
                </span>{" "}
                ,
                <span className="text-brand-color1 hover:border-b">
                  <button
                    onClick={() => {
                      router.push("/privacy");
                    }}
                  >
                    Privacy policy
                  </button>
                </span>
                ,{" "}
                <span className="text-brand-color1 hover:border-b">
                  <button
                    onClick={() => {
                      router.push("/shipping");
                    }}
                  >
                    Shipping policy
                  </button>
                </span>{" "}
                and {""}
                <span className="text-brand-color1 hover:border-b">
                  <button
                    onClick={() => {
                      router.push("/CancellationRefundPolicy");
                    }}
                  >
                    Cancel & Refund policy
                  </button>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;

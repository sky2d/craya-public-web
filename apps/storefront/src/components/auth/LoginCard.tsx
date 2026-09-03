"use client";

import GoogleIcon from "components/src/icons/iconFiles/GoogleIcon.svg";
import { InputFieldType } from "components/src/interfaces/InputField";
import { InputField2, Loading } from "components/src/minor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";

interface LoginCardProps {
  mobileNumber: string;
  error?: string;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  handelGoogleLogin: () => void;
}

const LoginCard: FC<LoginCardProps> = ({ mobileNumber, error, loading, handleInputChange, handleSubmit, handelGoogleLogin }) => {
  const router = useRouter();

  return (
    <div className="flex w-full max-w-lg flex-col justify-center rounded-[32px] bg-white-light4 p-4 px-4 shadow-lg">
      <h1 className="my-8 text-center text-4xl font-bold text-brand-color1">Sign in</h1>

      <div className="mb-4">
        <div className="my-4 h-[72px]">
          <InputField2
            type={InputFieldType.TELEPHONE}
            placeholder="Enter Mobile Number"
            className="py-3"
            value={mobileNumber}
            onChange={handleInputChange}
            errorMessage={error}
            iconPosition="right"
            icon={loading ? <Loading /> : <BsArrowRightCircleFill className="h-10 w-10 text-brand-color1" />}
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
          <Image draggable={false} src={GoogleIcon} alt="Google Icon" width={68} height={68} />
        </button>

        <p className="mt-4 text-center text-sm text-black-dark3">
          By logging in, you agree to our{" "}
          <span className="text-brand-color1 hover:border-b">
            <button onClick={() => router.push("/policy/terms")}>Terms and conditions</button>
          </span>
          ,{" "}
          <span className="text-brand-color1 hover:border-b">
            <button onClick={() => router.push("/policy/privacy")}>Privacy policy</button>
          </span>
          and{" "}
          <span className="text-brand-color1 hover:border-b">
            <button onClick={() => router.push("/policy/shipping")}>Shipping policy</button>
          </span>{" "}
          .
        </p>
      </div>
    </div>
  );
};

export default LoginCard;

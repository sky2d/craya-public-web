"use client";

import { GoogleSignInClicked } from "@/services/auth/socialLogin";
import WhiteLogo from "components/src/icons/iconFiles/WhiteLogo.svg";
import Image from "next/image";
import { useState } from "react";
import LoginCard from "./LoginCard";
interface LoginCardProps {
  loading: boolean;
  onSubmit: (mobileNumber: string) => void;
}

const Login: React.FC<LoginCardProps> = ({ onSubmit, loading }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");

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

  const handleGoogleLogin = () => {
    GoogleSignInClicked();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="my-10">
        <Image src={WhiteLogo} alt="Logo" draggable={false} height={350} width={350} />
      </div>
      <LoginCard
        mobileNumber={mobileNumber}
        error={error}
        loading={loading}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handelGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
};

export default Login;

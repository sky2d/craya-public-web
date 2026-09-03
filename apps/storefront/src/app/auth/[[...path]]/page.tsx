"use client";

import Login from "@/components/auth/Login";
import Otp from "@/components/auth/Otp";
import { sendOTP } from "@/services/auth/otpIntegration";
import { useState } from "react";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeMobileNumber = () => {
    setLoading(false);
    setCurrentPage("login");
  };

  const handleLoginSubmit = async (number: string) => {
    setMobileNumber(`91${number}`);
    setLoading(true);
    try {
      await sendOTP({
        mobile: number,
        onSuccess: () => setCurrentPage("otp"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-brand-color3 p-1">
      {currentPage === "login" && <Login onSubmit={handleLoginSubmit} loading={loading} />}
      {currentPage === "otp" && <Otp mobileNumber={mobileNumber} onChangeMobileNumber={handleChangeMobileNumber} />}
    </div>
  );
};

export default App;

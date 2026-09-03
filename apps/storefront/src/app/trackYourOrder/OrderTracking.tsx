"use client";

import { Loader } from "@/utils/loader";
import Track from "components/src/icons/iconFiles/Track.svg";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import Image from "next/image";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const OrderTracking: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const session = useSessionContext();

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      alert(`Tracking Order: ${trackingNumber}`);
    }
  };

  if (session.loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col-reverse items-center justify-center gap-8 px-6 py-12 md:flex-row md:items-start lg:px-20">
      {/* Left Section - Illustration & Text */}
      <div className="text-center lg:w-1/2 lg:text-left">
        <h1 className="text-[clamp(24px,4.53vw,120px)] font-black text-brand-color1">
          Track your <br /> orders easily
        </h1>
        <p className="mt-2 text-brand-color1">
          Track your order with tracking ID or <span className="cursor-pointer text-purple-600">Login</span> to track order.
        </p>

        {/* Illustration */}
        <div className="mt-6 flex w-full justify-center lg:justify-start">
          <Image src={Track} draggable={false} alt="Tracking" priority className="h-full w-full" />
        </div>
      </div>

      {/* Right Section - Tracking Form */}
      <div className="w-full max-w-sm space-y-4">
        {/* Tracking Box */}
        <div className="rounded-2xl border border-brand-color3 p-5 shadow-lg">
          <h2 className="text-gray-600 flex items-center gap-2 text-sm font-medium">📦 Track your Order</h2>

          {/* Input Field */}
          <div className="my-3 flex items-center rounded-2xl border border-brand-color3 px-3 py-2">
            <input
              type="text"
              placeholder="Type your tracking number"
              value={trackingNumber}
              onChange={e => setTrackingNumber(e.target.value)}
              className="w-full border-none bg-transparent text-sm outline-none"
            />
            <FaRegCopy className="text-gray-500 cursor-pointer" />
          </div>

          {/* Track Button */}
          <Button2 label="Track" type={ButtonType.PRIMARY} buttonSize="lg" handleClick={handleTrack} />
        </div>

        {/* Info Box */}
        <div className="rounded-2xl border border-brand-color3 p-4 text-center shadow-lg">
          <h3 className="text-gray-700 text-sm font-semibold">Can’t Find Your Order Details?</h3>
          <p className="text-gray-600 mt-1 text-xs">
            You would have received the tracking number on your message, and you also have the tracking number on the orders page.
          </p>

          {!session.doesSessionExist && (
            <>
              <div className="text-gray-500 mt-3 text-sm">or</div>
              <Button2 label="Login" type={ButtonType.PRIMARY} buttonSize="lg" handleClick={handleTrack} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;

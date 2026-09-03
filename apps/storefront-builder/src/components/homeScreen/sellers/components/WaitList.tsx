"use client";

import React, { useState } from "react";

const WaitList: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    if (!email.trim()) return;
    alert(`Added: ${email}`);
    setEmail(""); // Clear input after adding
  };

  return (
    <div className="my-11 flex w-full snap-start flex-col items-center justify-start p-1">
      <p className="my-8 text-3xl font-black text-black-dark1 sm:text-[3.8vw]">
        JOIN THE <span className="text-brand-color1">WAITLIST !!!</span>
      </p>
      <div className="flex max-w-md items-center rounded-full bg-[#B3B5DB8F]">
        {/* Input Field */}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="anything@gmail.com"
          className="text-gray-700 w-3/4 flex-grow truncate bg-transparent pl-6 outline-none"
        />

        {/* Add Button */}
        <button onClick={handleAdd} className="hover:bg-gray-700 rounded-full bg-[#585858] px-5 py-3 text-white-light4 transition">
          Add
        </button>
      </div>
    </div>
  );
};

export default WaitList;

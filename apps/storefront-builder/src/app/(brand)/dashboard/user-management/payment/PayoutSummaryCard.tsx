import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { FiChevronDown } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";

export const PayoutSummaryCard = () => (
  <>
    <WhiteBackgroundWrapper className="flex w-full rounded-lg shadow-sm">
      <div className="flex h-full w-full flex-col justify-between font-medium">
        <div className="text-gray-600 flex items-center gap-2">
          <IoWalletOutline size={18} />
          <h3 className="text-[clamp(16px, 1.2vw, 22px)]">Upcoming Pay Out</h3>
        </div>
        <p className="text-[clamp(22px, 1.8vw, 32px)]">₹200000.00</p>
        <p className="text-[clamp(12px, 0.8vw, 16px)] text-black-dark3">This Month</p>
      </div>
      <FiChevronDown size={20} className="text-gray-400 cursor-pointer" />
    </WhiteBackgroundWrapper>
    <WhiteBackgroundWrapper className="flex w-full items-start justify-between rounded-lg p-4 shadow-sm">
      <div className="flex h-full w-full flex-col justify-between font-medium">
        <div className="text-gray-600 flex items-center gap-2">
          <IoWalletOutline size={18} />
          <h3 className="text-[clamp(16px, 1.2vw, 22px)]">Total Payout (Uptill Now)</h3>
        </div>
        <p className="text-[clamp(22px, 1.8vw, 32px)]">₹200000.00</p>
      </div>
      <FiChevronDown size={20} className="text-gray-400 cursor-pointer" />
    </WhiteBackgroundWrapper>
  </>
);

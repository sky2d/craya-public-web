"use client";
import { IconButton } from "components/src/minor";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { getFromParamOrCookie } from "../utils/domain";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, backgroundColor }) => {
  const router = useRouter();
  const handleBackClick = () => {
    const searchParams = getFromParamOrCookie();

    if (window.history.length > 1) {
      router.back();
    } else if (typeof searchParams === "string" && searchParams) {
      window.location.href = searchParams;
    } else {
      router.push("/");
    }
  };

  return (
    <div className="text-white flex w-full items-center bg-brand-color3 py-4" style={{ backgroundColor }}>
      <div className="w-1/6">
        <IconButton icon={IoIosArrowBack} buttonStyle="text-5xl text-white-light4 cursor-pointer flex items-center" onClick={handleBackClick} />
      </div>
      <div className="flex w-full flex-col items-center text-center">
        <span className="h-full whitespace-normal break-words text-white-light4 heading-3">{title}</span>
        {subtitle && <span className="text-gray-300 h-full whitespace-normal break-words text-white-light4 body-xs">{subtitle}</span>}
      </div>
      <div className="w-1/6"></div>
    </div>
  );
};

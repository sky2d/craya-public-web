"use client";

import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  description?: string;
  statusCode?: number;
  title?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  description = "We’re sorry. the page you requested could not be found. Please go back to the home page",
  statusCode = 404,
  title = "Page Not Found",
}) => {
  const router = useRouter();
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-[#c5c4e0] px-4 text-center text-white-light4">
      <div className="text-white text-[100px] font-bold sm:text-[120px]">{statusCode} </div>

      <div className="mt-4 text-2xl font-semibold sm:text-3xl">{title}</div>

      <p className="text-md my-2 max-w-md font-bold text-white-light4 sm:text-base">{description}</p>
      <div className="mx-auto w-auto">
        <Button2 buttonSize="lg" handleClick={() => router.back()} type={ButtonType.PRIMARY} label="Go Home" className="w-auto" />
      </div>

      {/* Decorative elements */}
      <div className="absolute left-10 top-10 text-3xl">⭕</div>
      <div className="absolute bottom-10 right-10 text-3xl">❌</div>
      <div className="absolute right-1/3 top-1/4 rotate-45 text-2xl">❌</div>
      <div className="absolute bottom-1/3 left-0 text-3xl sm:left-1/4">⭕</div>

      <div className="mt-4 text-5xl">😞</div>
    </div>
  );
};

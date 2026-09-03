"use client";
import PaymentFailureIcon from "components/src/icons/iconFiles/PaymentFailureIcon.svg";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = ({ message }) => {
  const router = useRouter();
  return (
    <div className="bg-gray-50 text-gray-800 w-full">
      <div className="flex h-screen w-full flex-col items-center justify-center px-6 text-center">
        <Image src={PaymentFailureIcon} alt="Page Not Found" width={150} height={150} className="mb-6" />

        <h1 className="mb-2 text-2xl font-semibold">Oops! Page Not Found</h1>
        {message ? (
          <p className="text-gray-600 mb-6 max-w-md">{message}</p>
        ) : (
          <p className="text-gray-600 mb-6 max-w-md">
            The page you’re looking for doesn’t exist. It might have been removed or the URL might be incorrect.
          </p>
        )}

        <div className="w-full sm:w-1/2">
          <Button2
            type={ButtonType.PRIMARY}
            size="large"
            label="Go Back"
            handleClick={() => {
              router.back();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;

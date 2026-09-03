import { FC, ReactNode } from "react";

type DrawerWrapperProps = {
  children: ReactNode;
  className?: string;
};

const DrawerWrapper: FC<DrawerWrapperProps> = ({ children, className }) => {
  return (
    <div
      className={`fixed left-1/2 top-0 z-[9999] w-full -translate-x-1/2 transform rounded-b-[30px] shadow-md sm:w-[50%] md:w-[40%] lg:w-1/3 ${className}`}
    >
      {children}
    </div>
  );
};

export default DrawerWrapper;

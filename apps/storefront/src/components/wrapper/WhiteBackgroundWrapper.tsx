interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const WhiteBackgroundWrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return <div className={`my-4 h-auto w-full p-4 ${className}`}>{children}</div>;
};

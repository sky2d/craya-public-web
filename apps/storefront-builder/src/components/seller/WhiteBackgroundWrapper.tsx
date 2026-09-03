interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const WhiteBackgroundWrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return <div className={`${className} rounded-[10px] border border-[#CDCDCD] bg-[#FFFFFF] p-3`}>{children}</div>;
};

interface ContentWrapperProps {
  children: React.ReactNode;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return <div className="h-[91dvh] w-full overflow-y-auto bg-[#F9F9FB]">{children}</div>;
};

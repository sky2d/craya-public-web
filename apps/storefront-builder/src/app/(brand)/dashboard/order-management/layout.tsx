import { LoadingBar } from "components/src/minor/LoadingBar";
import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={<LoadingBar className="w-full" />}>
      <div className="p-2">{children}</div>
    </Suspense>
  );
};

export default Layout;

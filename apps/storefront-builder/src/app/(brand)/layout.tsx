import { SessionAuthForNextJS } from "@/components/auth/SessionAuthForNextJS";
import { CouponProvider } from "@/provider/CouponProvider";
import { StoreProvider } from "@/provider/StoreProvider";
import { ClientLayout } from "./clientLayout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SessionAuthForNextJS>
      <StoreProvider>
        <CouponProvider>
          <ClientLayout>{children}</ClientLayout>
        </CouponProvider>
      </StoreProvider>
    </SessionAuthForNextJS>
  );
};

export default Layout;

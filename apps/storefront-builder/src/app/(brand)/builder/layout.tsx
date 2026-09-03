import { SessionAuthForNextJS } from "@/components/auth/SessionAuthForNextJS";
import { BuilderProvider } from "@/provider/BuilderProvider";
import { DndContextProvider } from "@/provider/DndContextProvider";
import { ProductProvider } from "@/provider/ProductProvider";
import { ComponentStoreWrapper } from "./components/ComponentStoreWrapper";
import { Header } from "./components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SessionAuthForNextJS>
      <ProductProvider>
        <BuilderProvider>
          <div className="h-dvh min-h-screen !overflow-y-hidden bg-black-dark5">
            <Header />
            <div className="flex h-[90%] w-full p-4 pb-3">
              <DndContextProvider>
                <div className="w-[75%]">{children}</div>

                <div className="w-1/4">
                  <ComponentStoreWrapper />
                </div>
              </DndContextProvider>
            </div>
          </div>
        </BuilderProvider>
      </ProductProvider>
    </SessionAuthForNextJS>
  );
};

export default Layout;

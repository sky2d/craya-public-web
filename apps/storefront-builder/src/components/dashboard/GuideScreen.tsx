"use client";

import { useBuilderContext } from "@/provider/BuilderProvider";
import { useProductContext } from "@/provider/ProductProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { logout } from "@/services/auth/signOut";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2, CheckBox } from "components/src/minor";
import { useRouter } from "next/navigation";

const dashboardRoutes = [
  { path: "/dashboard/store", text: "Add Your Logo, Name, Color Scheme" },
  { path: "/dashboard/products", text: "Add Your Products" },
  { path: "/dashboard/continue-editing", text: "Customize Your Online Store" },
];

export const GuideScreen = () => {
  const router = useRouter();
  const completedSteps: string[] = [];
  const { products } = useProductContext();
  const { store } = useStoreContext();
  const { storefrontComponents } = useBuilderContext();
  if (store.id && store.name && store.primaryColor && store.logo) {
    completedSteps.push("/dashboard/store");
    if (products.length > 0) {
      completedSteps.push("/dashboard/products");
      if (storefrontComponents && storefrontComponents.length > 0) {
        completedSteps.push("/dashboard/continue-editing");
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col px-2 pt-5">
        <h2 className="text-3xl font-semibold">Set Up Guide</h2>
        <div className="border-gray-500 w-full rounded-lg p-1 pb-8 text-xs font-normal">
          <span className="text-[#6E6C6C]"> {Math.min(completedSteps.length, 3)}/3 Steps completed</span>
        </div>
        {dashboardRoutes.map((routeData, index) => (
          <div
            onClick={completedSteps.includes(routeData.path) ? () => router.push(routeData.path) : () => {}}
            key={index}
            className={`group relative my-1 cursor-pointer rounded-lg border-[1px] border-solid ${completedSteps.includes(routeData.path) ? "border-brand-color1" : "border-[#C7C7C8] text-[#C7C7C8]"} p-2 px-2 transition-all duration-300 ease-in-out`}
          >
            <div className="flex items-center gap-1 space-x-1">
              <CheckBox className="!h-5 !w-5" checked={completedSteps.includes(routeData.path)} />
              <h4 className="text-xs">{routeData.text}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2">
        <Button2 label="Logout" type={ButtonType.PRIMARY} buttonSize="lg" handleClick={logout} />
      </div>
    </div>
  );
};

"use client";

import { useStoreContext } from "@/provider/StoreProvider";
import { LoadingBar } from "components/src/minor/LoadingBar";
import { twMerge } from "tailwind-merge";
import { GuideScreen } from "./GuideScreen";
import { MenuScreen } from "./MenuScreen";

export const LeftPanel = () => {
  const { store, storeLoading } = useStoreContext();

  return (
    <div className={twMerge("max-w-1/6 h-full w-auto", store.isOnboarding ? "pr-2" : "")}>
      <div className={`flex h-[91vh] w-auto overflow-y-auto sm:overflow-x-hidden ${storeLoading ? "" : ""}`}>
        {storeLoading ? <LoadingBar /> : store.isOnboarding ? <GuideScreen /> : <MenuScreen />}
      </div>
    </div>
  );
};

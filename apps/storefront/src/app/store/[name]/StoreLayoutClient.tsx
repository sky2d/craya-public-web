"use client";

import Header from "@/components/navbar/Header";
import { ProductProvider } from "@/provider/ProductProvider";
import { SocialProvider } from "@/provider/SocialProvider";
import { StorefrontProvider } from "@/provider/StorefrontProvider";
import { StoreProvider } from "@/provider/StoreProvider";
import { trackUniqueStoreVisit } from "@/services/mixpanel/setStoreVisitors";
import { Loader } from "@/utils/loader";
import { useHasHydrated } from "components/src/hooks/useHasHydrated";
import { Store, StoreData } from "components/src/interfaces";
import dynamic from "next/dynamic";
import { useEffect } from "react";

interface StoreLayoutClientProps {
  fullStoreData: StoreData;
  children: React.ReactNode;
}

const StoreFooter = dynamic(() => import("@/components/footer/StoreFooter").then(mod => mod.StoreFooter), { ssr: false });
const ModalWrapper = dynamic(() => import("@/components/wrapper/ModalWrapper").then(mod => mod.ModalWrapper), { ssr: false });

export default function StoreLayoutClient({ fullStoreData, children }: StoreLayoutClientProps) {
  const hasHydrated = useHasHydrated();
  const products = fullStoreData.products ?? [];
  const policies = fullStoreData.policies ?? [];

  const storeDetails: Store = {
    sizeChartImageIds: fullStoreData.sizeChartImageIds,
    id: fullStoreData.id,
    name: fullStoreData.name,
    address: fullStoreData.address,
    primaryColor: fullStoreData.primaryColor,
    description: fullStoreData.description,
    logoId: fullStoreData.logoId,
    logo: fullStoreData.logo,
    isOnboarding: fullStoreData.isOnboarding,
    socials: fullStoreData.socials,
    url: fullStoreData.url,
    user: fullStoreData.user,
    storeTags: fullStoreData.storeTags,
  };

  useEffect(() => {
    if (fullStoreData.id && fullStoreData.url) {
      trackUniqueStoreVisit(fullStoreData.id, fullStoreData.url);
    }
  }, [fullStoreData.id, fullStoreData.url]);

  if (!hasHydrated) {
    return <Loader />;
  }

  return (
    <StoreProvider initialStoreData={storeDetails}>
      <StorefrontProvider initialStoreData={fullStoreData}>
        <SocialProvider data={policies}>
          <ProductProvider data={products}>
            <Header isRootDomain={false} storeDetails={storeDetails} />
            {children}
            <StoreFooter />
            <ModalWrapper />
          </ProductProvider>
        </SocialProvider>
      </StorefrontProvider>
    </StoreProvider>
  );
}

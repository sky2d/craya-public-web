"use client";

import FAQimage from "@/components/home/assets/FAQimage.png";
import Guidelines from "@/components/home/assets/Guidelines.png";
import HeroBanner from "@/components/home/assets/HeroBanner.png";
import { ContactUs } from "@/components/home/components/ContactUs";
import { FAQSection } from "@/components/home/components/FAQSection";
import { FeaturesCarousel } from "@/components/home/components/FeaturesCarousel";
import ProgressBar from "@/components/home/components/ProgressBar";
import { ProgressBar_2 } from "@/components/home/components/ProgressBar_2";
import { useStoreContext } from "@/provider/StoreProvider";
import { getStoreStatus } from "components/src/services/api";
import Image from "next/image";
import { useEffect } from "react";

export const Home = () => {
  const { store, setStoreStatus, StoreStatus, storeLoading } = useStoreContext();

  useEffect(() => {
    const fetchStoreStatus = async () => {
      if (!store.id) return;
      const storeStatus = await getStoreStatus(store.id);
      if (storeStatus.data) {
        setStoreStatus(storeStatus.data);
      }
    };

    fetchStoreStatus();
  }, [store]);
  return (
    <>
      <div className="flex items-center justify-between gap-3 p-5">
        <div className="p-2 text-brand-color1">
          <p className="text-[36px] font-bold">
            Welcome <br /> {storeLoading ? "......" : store.name!.toUpperCase()} ,
          </p>
        </div>
        <div className="w-1/2">
          <ProgressBar status={StoreStatus!} />
        </div>
        <ProgressBar_2 progress={StoreStatus?.percentage} />
      </div>
      <div>
        <Image src={HeroBanner} alt="hero banner" />
      </div>
      <div className="mt-7 flex flex-col items-center">
        <h1 className="text-brand-color1 heading-2 [text-shadow:_-4px_1px_0px_#f9ce31]">Craya Guidelines</h1>
        <div>
          <Image src={Guidelines} height={500} width={500} className="object-contain" alt="guidelines" />
        </div>
      </div>

      <p className="mt-7 text-center text-brand-color1 heading-2">What&apos;s Coming</p>
      <div className="mt-4">
        <FeaturesCarousel />
      </div>
      <div className="mt-7 flex items-center justify-center gap-2 pl-2 pr-2">
        <div>
          <Image width={200} height={200} src={FAQimage} alt="FAQ" />
        </div>
        <div className="w-[60%]">
          <p className="text-brand-color1 heading-2">FAQ</p>
          <div className="mt-4">
            <FAQSection />
          </div>
        </div>
      </div>
      <div className="mt-7">
        <ContactUs />
      </div>
    </>
  );
};

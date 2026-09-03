"use client";

import { BuilderProductLayout } from "@/components/dashboard/BuilderProductLayout";
import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { useProductContext } from "@/provider/ProductProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { SIZE_PROFILE_LABELS } from "components/src/constant/product";
import chat from "components/src/icons/iconFiles/chat.svg";
import { Dropdown } from "components/src/minor";
import { LoadingBar } from "components/src/minor/LoadingBar";
import { ModalBox } from "components/src/minor/ModalBox";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderSection } from "../products/components/HeaderSection";

const AddProductScreen = () => {
  const { products, productsLoading } = useProductContext();
  const { store } = useStoreContext();
  const [sizeProfile, setSizeProfile] = useState<string>("All Products");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (!store.id) return;
    if (store.isOnboarding && products.length === 0) {
      setIsModalOpen(true);
    }
  }, []);

  const productList = sizeProfile === "All Products" ? products : products.filter(product => product.sizeProfile === sizeProfile);

  if (productsLoading) {
    return <LoadingBar />;
  }
  return (
    <div className="relative h-full overflow-y-hidden">
      <div className="w-full p-3">
        <HeaderSection />
      </div>
      <div className="h-[90%] px-3 pb-2">
        <WhiteBackgroundWrapper className=" h-full overflow-y-auto">
          <ModalBox
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            type1
            image={chat}
            title="👀 Don’t Miss the Tips!"
            description="Keep an eye out for tooltips across your storefront — they’re packed with quick tips and tricks to help you set up smarter and sell better."
          />
          <div className="flex items-center justify-between">
            <h3 className="paragraph">Products :</h3>
            <Dropdown
              onSelect={value => setSizeProfile(value)}
              options={["All Products", ...Object.values(SIZE_PROFILE_LABELS)]}
              defaultOption="All Products"
              className="w-60"
            />
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(10vw,_1fr))] gap-6 sm:p-4">
            {productList?.map((product, index) => (
              <BuilderProductLayout
                key={index}
                product={product}
                backgroundColor={store.primaryColor}
                handleClick={() => router.push(`/dashboard/products/${product.id}`)}
              />
            ))}
          </div>
        </WhiteBackgroundWrapper>
      </div>
    </div>
  );
};

export default AddProductScreen;

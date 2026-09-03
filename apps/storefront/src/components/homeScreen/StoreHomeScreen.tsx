"use client";

import { HALF_WIDTH_COMPONENTS } from "@/constants/storefront";
import { useModalContext } from "@/provider/ModalProvider";
import { useProductContext } from "@/provider/ProductProvider";
import { useStorefrontContext } from "@/provider/StorefrontProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { useUserContext } from "@/provider/UserProvider";
import { handleAddToWishList, handleProductPress, handleProductsPress, handleShare } from "@/services/storeActions";
import { Loader } from "@/utils/loader";
import { storefrontComponentMapping } from "components/src/constant/storefront";
import { StorefrontActions, StorefrontComponentData, StorefrontComponentType, Wishlist } from "components/src/interfaces";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { LazyWrapper } from "../wrapper/LazyWrapper";

const StoreHomeScreen: FC = () => {
  const router = useRouter();
  const { storefront } = useStorefrontContext();
  const { products, handleUpdateSearchedProduct } = useProductContext();
  const { wishlist, setWishlist, user } = useUserContext();
  const { storeDetails } = useStoreContext();
  const { openModal } = useModalContext();

  const updateWishlist = (newWishlist: Wishlist) => {
    setWishlist(newWishlist);
  };

  const handleComponentAction = (action: StorefrontActions, data: StorefrontComponentData, type?: StorefrontComponentType) => {
    if (action === StorefrontActions.PRODUCTS_PRESS) {
      handleProductsPress(data.products, router, handleUpdateSearchedProduct, type);
    } else if (action === StorefrontActions.PRODUCT_PRESS) {
      handleProductPress(router, `/products/details/${data.products[0].id}`);
    } else if (action === StorefrontActions.ADD_TO_WISHLIST) {
      handleAddToWishList(data.products[0], updateWishlist, wishlist, user, openModal);
    } else if (action === StorefrontActions.BRAND_INFO_PRESS) {
      router.push(`/about`);
    } else if (action === StorefrontActions.SHARE_PRESS) {
      handleShare(data.loops[0].video.id!, storeDetails?.id);
    }
  };

  if (!storefront || !storefront.storefrontComponents) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center">
      {storefront?.storefrontComponents?.map((component, index) => {
        const item = storefrontComponentMapping.get(component.type);
        if (!item) {
          return <div key={index}>{`${component.type} is invalid`}</div>;
        }

        const { component: Component } = item;
        const isHalfWidth = HALF_WIDTH_COMPONENTS.includes(component.type);
        const widthClass = isHalfWidth ? "w-full sm:w-3/4" : "w-full";

        const componentData = { ...component.data, store: storeDetails ?? null };

        return (
          <LazyWrapper
            key={index}
            className={`${widthClass} mx-auto ${index === 0 && component.type === StorefrontComponentType.IMAGE_CAROUSEL ? "mb-8" : "mt-8"} ${index === storefront.storefrontComponents.length - 1 ? "mb-8" : ""}`}
          >
            <Component data={componentData} handlerFunction={handleComponentAction} wishlistItems={wishlist?.wishlistItems} products={products} />
          </LazyWrapper>
        );
      })}
    </div>
  );
};
export default StoreHomeScreen;

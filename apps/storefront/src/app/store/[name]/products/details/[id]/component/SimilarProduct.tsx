"use client";

import { useProductContext } from "@/provider/ProductProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { useUserContext } from "@/provider/UserProvider";
import { handleProductPress, handleProductsPress } from "@/services/storeActions";
import { Loader } from "@/utils/loader";
import { Review, SimpleProduct, StorefrontActions, StorefrontComponentData, StorefrontComponentType, Wishlist } from "components/src/interfaces";
import { createStorefrontData } from "components/src/services/storefront";
import { ProductGrid } from "components/src/storefront/main";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface SimilarProductsProps {
  products?: SimpleProduct[];
  reviews?: Review[];
}

const ProductDetailScreen: React.FC<SimilarProductsProps> = ({ products }) => {
  const session = useSessionContext();
  const { handleUpdateSearchedProduct } = useProductContext();
  const { storeDetails } = useStoreContext();
  const { wishlist, setWishlist, user } = useUserContext();
  const router = useRouter();

  const updateWishlist = useCallback(
    (newWishlist: Wishlist) => {
      setWishlist(newWishlist);
    },
    [setWishlist],
  );

  const handleComponentAction = useCallback(
    (action: StorefrontActions, data: StorefrontComponentData, type?: StorefrontComponentType) => {
      if (action === StorefrontActions.PRODUCTS_PRESS) {
        handleProductsPress(data.products, router, handleUpdateSearchedProduct, type);
      } else if (action === StorefrontActions.PRODUCT_PRESS) {
        handleProductPress(router, `/products/details/${data.products[0].id}`);
      }
    },
    [updateWishlist, user, wishlist],
  );

  const storefrontData = useMemo(
    () =>
      createStorefrontData({
        store: storeDetails,
        products: products || [],
      }),
    [storeDetails, products],
  );

  if (!products || session.loading) {
    return <Loader />;
  }

  return (
    <>
      {products.length > 0 && (
        <div className="flex w-full flex-col">
          <p className="my-4 px-2 text-xl font-bold sm:text-3xl md:text-4xl">Similar Products</p>
          <ProductGrid data={storefrontData} handlerFunction={handleComponentAction} wishlistItems={wishlist?.wishlistItems} />
        </div>
      )}
    </>
  );
};

export default React.memo(ProductDetailScreen);

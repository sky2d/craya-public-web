"use client";

import { useModalContext } from "@/provider/ModalProvider";
import { useProductContext } from "@/provider/ProductProvider";
import { useStorefrontContext } from "@/provider/StorefrontProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { useUserContext } from "@/provider/UserProvider";
import { handleAddToWishList, handleProductPress } from "@/services/storeActions";
import { Loader } from "@/utils/loader";
import { SimpleProduct, StorefrontActions, StorefrontComponentData, Wishlist } from "components/src/interfaces";
import { PageHeader } from "components/src/major/PageHeader";
import { createStorefrontData } from "components/src/services/storefront";
import { AllProductGrid } from "components/src/storefront/main/ProductGrid";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { SortButton } from "./component/SortButton";

interface AllProductsProps {
  fetchedProducts: SimpleProduct[];
  errorMessage?: string | null;
}
const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });

const AllProducts = ({ fetchedProducts, errorMessage }: AllProductsProps) => {
  const router = useRouter();
  const { products, productsLoading, searchedProduct, handleUpdateSearchedProduct, handleSort } = useProductContext();
  const { storeDetails, storeLoading } = useStoreContext();
  const { wishlist, setWishlist } = useUserContext();
  const { storefront } = useStorefrontContext();
  const { user } = useUserContext();
  const { openModal } = useModalContext();
  const searchParams = useSearchParams();

  const components = useMemo(() => searchParams.get("component"), [searchParams]);

  const updateWishlist = (newWishlist: Wishlist) => {
    setWishlist(newWishlist);
  };

  const filteredProducts = useMemo(() => {
    if (!components || !products?.length || !storefront?.storefrontComponents?.length) return [];
    const component = storefront?.storefrontComponents.find(c => c.type === components);
    return products.filter(product => product.id && component?.data?.productsPerImage?.[0]?.includes(product.id));
  }, [components, products, storefront?.storefrontComponents]);

  const handleComponentAction = (action: StorefrontActions, data: StorefrontComponentData) => {
    if (action === StorefrontActions.PRODUCT_PRESS) {
      handleProductPress(router, `/products/details/${data.products[0].id}`);
    } else if (action === StorefrontActions.ADD_TO_WISHLIST) {
      handleAddToWishList(data.products[0], updateWishlist, wishlist, user, openModal);
    }
  };

  useEffect(() => {
    if (fetchedProducts.length > 0) {
      const filtered = storeDetails?.id ? fetchedProducts.filter(product => product.storeId === storeDetails.id) : [];
      handleUpdateSearchedProduct(filtered);
    } else if (filteredProducts.length > 0) {
      handleUpdateSearchedProduct(filteredProducts);
    }
  }, [fetchedProducts, filteredProducts]);

  if (productsLoading || storeLoading) {
    return <Loader />;
  }

  if (errorMessage || (fetchedProducts.length >= 1 && searchedProduct.length === 0)) {
    return <ErrorPage description={errorMessage || "No products matched the search criteria"} title="Product Not Found" />;
  }

  const storefrontData = createStorefrontData({
    products: searchedProduct.length > 0 ? searchedProduct : products,
    store: storeDetails,
  });

  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <div className="flex-grow">
        <PageHeader
          title={storeDetails?.name || "All Products"}
          subtitle={`${searchedProduct.length > 0 ? searchedProduct.length : products.length} products`}
          backgroundColor={storeDetails?.primaryColor}
        />

        <div className="my-4 flex flex-col items-center justify-center">
          {/* {searchedProduct.length > 1 && ( */}
          <div className="m-2 flex w-full items-center justify-end rounded-lg sm:w-3/4">
            <SortButton onSort={sortType => handleSort(sortType, storeDetails?.id)} primaryColor={storeDetails?.primaryColor} />
          </div>
          {/* )} */}

          <div className="w-full p-2 sm:w-3/4">
            {products.length ? (
              <AllProductGrid data={storefrontData} handlerFunction={handleComponentAction} wishlistItems={wishlist?.wishlistItems} />
            ) : (
              <p>No products available..</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

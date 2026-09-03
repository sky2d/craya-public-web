"use client";

import { useProductDetail } from "@/hooks/useProductDetail";
import { Loader } from "@/utils/loader";
import { Product, Review } from "components/src/interfaces/product";
import ProductCarousel from "components/src/major/ProductCarousel";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import ProductDetails from "./component/ProductDetails";
import ProductStylesAndSizes from "./component/ProductStylesAndSizes";

const ProductSoldOut = dynamic(() => import("./component/ProductSoldOut"));
const ProductDelivery = dynamic(() => import("./component/ProductDelivery"));
const ProductDescription = dynamic(() => import("./component/ProductDescription"));
const ProductReviews = dynamic(() => import("./component/ProductReviews"));
const ProductActionButtons = dynamic(() => import("./component/ProductActionButtons"));

interface ProductDetailScreenProps {
  product: Product;
  reviews?: Review[];
}

const ProductDetailContent: React.FC<ProductDetailScreenProps> = ({ product, reviews }) => {
  const {
    storeDetails,
    selectedAddress,
    selectedSku,
    selectedColor,
    setSelectedColor,
    productSku,
    cartLoading,
    handleSkuSelect,
    handleLikePress,
    isLiked,
    primaryColor,
    isOutOfStock,
  } = useProductDetail(product);

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {isOutOfStock && <ProductSoldOut />}
      <div className="my-4 w-full md:w-3/4">
        <div className="flex w-full flex-col items-start justify-between sm:flex-row">
          <ProductCarousel productSku={productSku[selectedColor]} />

          <div className="h-full w-full p-2 sm:w-1/2">
            <ProductDetails product={product} store={storeDetails} />

            <ProductStylesAndSizes
              product={product}
              onSelectColor={setSelectedColor}
              selectedColor={selectedColor}
              productSku={productSku}
              onSkuSelect={handleSkuSelect}
              primaryColor={primaryColor}
            />
            <Suspense fallback={<Loader />}>
              <ProductActionButtons
                isOutOfStock={isOutOfStock}
                isLiked={isLiked}
                onLike={handleLikePress}
                primaryColor={primaryColor}
                disabled={cartLoading || !selectedSku}
              />

              {storeDetails?.id && selectedAddress?.pinCode && (
                <ProductDelivery
                  storeId={storeDetails.id}
                  pinCode={selectedAddress.pinCode}
                  weightInGrams={product.weightInGrams}
                  primaryColor={primaryColor}
                />
              )}
            </Suspense>
          </div>
        </div>

        <div className="bg-gray-50 flex w-full flex-col items-start justify-center gap-6 rounded-lg p-2 sm:flex-row">
          <Suspense fallback={<Loader />}>
            <div className="w-full sm:w-1/2">
              <ProductDescription backgroundColor={primaryColor} description={product.description || ""} />
            </div>
            <div className="w-full sm:w-1/2">
              <ProductReviews reviews={reviews} storeDetails={storeDetails} />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductDetailContent);

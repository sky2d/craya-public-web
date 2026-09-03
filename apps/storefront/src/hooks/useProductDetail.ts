"use client";

import { useCartContext } from "@/provider/CartProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { useUserContext } from "@/provider/UserProvider";
import { isProductInWishlist } from "@/services/formatUtils";
import { handleAddToWishList } from "@/services/storeActions";
import { convertToProductStockList } from "@/utils/product";
import { CreateProductSku, Product, ProductSKU, Wishlist } from "components/src/interfaces/product";
import { useCallback, useEffect, useState } from "react";

export const useProductDetail = (product: Product) => {
  const { wishlist, setWishlist, selectedAddress } = useUserContext();
  const { setSelectedCartItem, cartLoading } = useCartContext();
  const { storeDetails } = useStoreContext();
  const [selectedSku, setSelectedSku] = useState<ProductSKU | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [productSku, setProductSku] = useState<CreateProductSku[]>([]);

  /** Build product SKU list */
  useEffect(() => {
    if (product) {
      const skuList = convertToProductStockList(product.productSKUs);
      setProductSku(skuList);
    }
  }, [product]);

  const handleSkuSelect = useCallback(
    (sku: ProductSKU | null) => {
      if (sku && storeDetails) {
        setSelectedSku(sku);
        setSelectedCartItem({
          product,
          productSKU: sku,
          productDetails: product.productDetails,
          quantity: 1,
          store: storeDetails,
        });
      } else {
        setSelectedSku(null);
        setSelectedCartItem(null);
      }
    },
    [product, setSelectedCartItem, storeDetails],
  );

  /** Wishlist */
  const updateWishlist = useCallback((newWishlist: Wishlist) => setWishlist(newWishlist), [setWishlist]);

  const handleLikePress = useCallback(() => {
    if (wishlist) handleAddToWishList(product, updateWishlist, wishlist);
  }, [wishlist, product, updateWishlist]);

  return {
    wishlist,
    storeDetails,
    selectedAddress,
    selectedSku,
    selectedColor,
    setSelectedColor,
    productSku,
    cartLoading,
    handleSkuSelect,
    handleLikePress,
    isLiked: wishlist ? isProductInWishlist(product, wishlist) : false,
    primaryColor: storeDetails?.primaryColor || "#7C54E9",
    isOutOfStock: product.isOutOfStock,
  };
};

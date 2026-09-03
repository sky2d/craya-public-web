"use client";

import { Product, SimpleProduct } from "components/src/interfaces";
import { showPopup } from "components/src/minor";
import { getBestSellingProduct, getNewArrivalProduct, getProductDetails } from "components/src/services/api";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useStoreContext } from "./StoreProvider";

interface ProductContextType {
  productsLoading: boolean;
  products: SimpleProduct[];
  tags: string[];
  searchedProduct: SimpleProduct[];
  setProductsLoading: (loading: boolean) => void;
  handleSort: (sortType: string, storeId?: string) => Promise<void>;
  handleUpdateSearchedProduct: (products: SimpleProduct[]) => void;
}

const ProductContext = createContext({});

interface ProductProviderProps {
  children: ReactNode;
  data: Product[];
}

export const ProductProvider = ({ children, data }: ProductProviderProps) => {
  const { storeDetails } = useStoreContext();
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [products] = useState<SimpleProduct[]>(data);
  const [searchedProduct, setSearchedProduct] = useState<SimpleProduct[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const session = useSessionContext();

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const { data } = await getProductDetails(storeDetails?.id);
        if (data) {
          const productTags = data.map(product => product.value);
          const shuffledTags = productTags.sort(() => Math.random() - 0.5);
          setTags(shuffledTags);
        }
      } catch (error) {
        showPopup("error", String(error));
        return;
      }
    };
    if (!session.loading && session.doesSessionExist && storeDetails?.id && tags.length === 0) {
      fetchRecentSearches();
    }
  }, [session, storeDetails, tags.length]);

  const handleSort = async (sortType: string, storeId?: string) => {
    if (storeId) {
      setProductsLoading(true);
      if (sortType === "best-selling") {
        const { data } = await getBestSellingProduct(storeId);
        setSearchedProduct(data ? data : products);
      } else if (sortType === "new-arrival") {
        const { data } = await getNewArrivalProduct(storeId);
        setSearchedProduct(data ? data : products);
      }
      setProductsLoading(false);
      return;
    }

    setSearchedProduct(prev => {
      const sorted = [...prev];
      sorted.sort((a, b) => {
        const priceA = a.discountedPrice ?? a.price;
        const priceB = b.discountedPrice ?? b.price;

        if (sortType === "price-high-low") return priceB - priceA;
        if (sortType === "price-low-high") return priceA - priceB;
        return 0;
      });
      return sorted;
    });
  };

  const handleUpdateSearchedProduct = (products: SimpleProduct[]) => {
    setSearchedProduct(products);
  };

  const value: ProductContextType = {
    productsLoading,
    setProductsLoading,
    products,
    tags,
    searchedProduct,
    handleSort,
    handleUpdateSearchedProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => useContext(ProductContext) as ProductContextType;

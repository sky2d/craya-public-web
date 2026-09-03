"use client";

import { Loop, StorefrontComponent, StorefrontComponentData } from "components/src/interfaces";
import { Coupon } from "components/src/interfaces/Coupon";
import { getLoops } from "components/src/services/api";
import { getCoupons } from "components/src/services/api/coupons";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useStoreContext } from "./StoreProvider";

interface BuilderContextType {
  storefrontComponents: StorefrontComponent[];
  setStorefrontComponents: (value: StorefrontComponent[]) => void;

  viewMode: string;
  setViewMode: (value: string) => void;

  isProductsVisible: boolean;
  setIsProductsVisible: (value: boolean) => void;

  newStorefrontComponent: StorefrontComponent;
  setNewStorefrontComponent: (value: StorefrontComponent | null) => void;

  isOpenComponentList: boolean;
  setIsOpenComponentList: (value: boolean) => void;

  productPerImageIndex: number;
  setProductPerImageIndex: (value: number) => void;

  storefrontLink: string;
  setStorefrontLink: (value: string) => void;

  loops: Loop[];
  coupons: Coupon[];

  loading: boolean;
  setBuilderLoading: (value: boolean) => void;

  setData: (data: Partial<StorefrontComponentData>) => void;

  isComponentUpdated: boolean;
  setIsComponentUpdated: (value: boolean) => void;

  isOpenImageGridPreview: boolean;
  setIsOpenImageGridPreview: (value: boolean) => void;
}

const BuilderContext = createContext({});

interface BuilderProviderProps {
  children: ReactNode;
  initialStorefrontComponents?: StorefrontComponent[];
}

export const BuilderProvider: React.FC<BuilderProviderProps> = ({ children, initialStorefrontComponents }) => {
  const { store } = useStoreContext();
  const [storefrontComponents, _setStorefrontComponents] = useState<StorefrontComponent[]>(initialStorefrontComponents || []);
  const [newStorefrontComponent, setNewStorefrontComponent] = useState<StorefrontComponent | null>(null);
  const [isOpenComponentList, setIsOpenComponentList] = useState(false);
  const [viewMode, setViewMode] = useState("Desktop");
  const [storefrontLink, setStorefrontLink] = useState("");
  const [loading, setBuilderLoading] = useState(false);
  const [isComponentUpdated, setIsComponentUpdated] = useState(false);
  const [isOpenImageGridPreview, setIsOpenImageGridPreview] = useState(true);
  const [isProductsVisible, setIsProductsVisible] = useState(false);
  const [productPerImageIndex, setProductPerImageIndex] = useState(0);
  const [loops, setLoops] = useState<Loop[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const fetchLoops = async () => {
      if (store.id) {
        const { data } = await getLoops(store.id);
        if (data?.length) setLoops(data);
      }
    };
    const fetchCoupons = async () => {
      if (store.id) {
        const { data } = await getCoupons(store.id);
        if (data?.length) setCoupons(data);
      }
    };

    fetchLoops();
    fetchCoupons();
  }, [store.id]);

  const setData = (data: Partial<StorefrontComponentData>) => {
    if (!newStorefrontComponent) return;

    const updatedData = { ...newStorefrontComponent?.data, ...data };
    setNewStorefrontComponent({
      ...newStorefrontComponent,
      data: updatedData,
    });
  };

  const setStorefrontComponents = (value: StorefrontComponent[]) => {
    const newValue = value.map(component => {
      component.data.store = store;
      return component;
    });
    _setStorefrontComponents(newValue);
  };

  return (
    <BuilderContext.Provider
      value={{
        storefrontComponents,
        setStorefrontComponents,
        newStorefrontComponent,
        setNewStorefrontComponent,
        isOpenComponentList,
        setIsOpenComponentList,
        viewMode,
        setViewMode,
        storefrontLink,
        setStorefrontLink,
        isProductsVisible,
        setIsProductsVisible,
        isOpenImageGridPreview,
        setIsOpenImageGridPreview,
        productPerImageIndex,
        setProductPerImageIndex,
        loops,
        coupons,
        loading,
        setBuilderLoading,
        setData,
        isComponentUpdated,
        setIsComponentUpdated,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => useContext(BuilderContext) as BuilderContextType;

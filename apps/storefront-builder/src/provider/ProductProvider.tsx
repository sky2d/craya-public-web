"use client";

import { convertToProductSkus } from "@/utils/convertToProductSkus";
import { COLORS } from "components/src/constant/colors";
import { CreateProductSku, Product, ProductDetail, ProductError, ProductSKU, SimpleProduct, UploadedFile } from "components/src/interfaces";
import { showPopup } from "components/src/minor";
import { fetchProducts } from "components/src/services/api";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStoreContext } from "./StoreProvider";

interface ProductContextType {
  productsLoading: boolean;
  setProductsLoading: (loading: boolean) => void;

  selectedProductLoading: boolean;
  setSelectedProductLoading: (loading: boolean) => void;

  products: SimpleProduct[];
  setProducts: (products: SimpleProduct[]) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null, changed?: boolean) => void;

  SizeChartImageIds: string[];
  setSizeChartImageIds: (selectedSizeChartImageIds: string[]) => void;

  sizeChartImages: UploadedFile[];
  setSizeChartImages: (selectedSizeChartImages: UploadedFile[]) => void;

  originalProductSKUs: ProductSKU[] | null;
  setOriginalProductSKUs: (productSKUs: ProductSKU[] | null) => void;

  productError: ProductError | null;
  setProductError: (productError: ProductError | null) => void;

  isSelectedProductChanged: boolean;
  _setIsSelectedProductChanged: (isSelectedProductChanged: boolean) => void;

  isSelectedProductDetailsChanged: boolean;
  isSelectedProductSKUsChanged: boolean;
  isProductInfoChanged: boolean;

  setProductDetails: (productDetails: ProductDetail, changed?: boolean) => void;
  setProductSKUs: (productSKUs: CreateProductSku[], changed?: boolean) => void;
  setIsProductInfoChanged: (isProductInfoChanged: boolean) => void;

  resetSelectProductChanges: () => void;
}

const ProductContext = createContext({});

export const INITIAL_PRODUCT_DATA: Product = {
  selectedSizeChartImageId: null,
  storeId: "",
  imageId: "",
  name: "",
  sizeProfile: null,
  discountedPrice: 0,
  price: 0,
  description: "",
  shortDescription: "",
  productDetails: [],
  productSKUs: [{ skuCombineKey: uuidv4(), productId: "", color: COLORS.defaultColor, imageIds: [], images: [], size: null, quantity: 0 }],
  isOutOfStock: false,
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const { store } = useStoreContext();
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [selectedProductLoading, setSelectedProductLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [selectedProduct, _setSelectedProduct] = useState<Product | null>(null);
  const [SizeChartImageIds, setSizeChartImageIds] = useState<string[]>(store.sizeChartImageIds || []);
  const [sizeChartImages, setSizeChartImages] = useState<UploadedFile[]>(store.sizeChartImages || []);
  const [productError, setProductError] = useState<ProductError | null>(null);
  const [isSelectedProductChanged, _setIsSelectedProductChanged] = useState<boolean>(false);
  const [isSelectedProductDetailsChanged, _setIsSelectedProductDetailsChanged] = useState<boolean>(false);
  const [isSelectedProductSKUsChanged, _setIsSelectedProductSKUsChanged] = useState<boolean>(false);
  const [isProductInfoChanged, setIsProductInfoChanged] = useState<boolean>(false);
  const [originalProductSKUs, setOriginalProductSKUs] = useState<ProductSKU[] | null>(null);

  useEffect(() => {
    if (!store.id) return;
    setProductsLoading(true);
    fetchProducts(store.id).then(response => {
      if (response.data) setProducts(response.data);
      else showPopup("error", "Unable to fetch products");
      setProductsLoading(false);
    });
  }, [store.id]);

  useEffect(() => {
    if (SizeChartImageIds.length === 0 && store.sizeChartImageIds) {
      setSizeChartImageIds(store.sizeChartImageIds);
    }
    if (store.sizeChartImages && sizeChartImages.length === 0) {
      setSizeChartImages(store.sizeChartImages);
    }
  }, [store.sizeChartImageIds, store.sizeChartImages]);

  const setSelectedProduct = (product: Product | null, changed = true) => {
    setProductError(null);
    _setSelectedProduct(product);
    if (product != null && product.id) {
      _setIsSelectedProductChanged(changed);
      setIsProductInfoChanged(true);
    }
  };

  const setProductDetails = (productDetails: ProductDetail) => {
    if (!selectedProduct) return;
    const updatedProductDetails = [...selectedProduct.productDetails];
    updatedProductDetails.push(productDetails);
    _setSelectedProduct({ ...selectedProduct, productDetails: updatedProductDetails });
    setIsProductInfoChanged(true);
    _setIsSelectedProductDetailsChanged(true);
    _setIsSelectedProductChanged(true);
  };

  const setProductSKUs = (productSKUs: CreateProductSku[]) => {
    if (!selectedProduct) return;
    const convertedProductSkus = convertToProductSkus(productSKUs);
    setSelectedProduct({ ...selectedProduct, productSKUs: convertedProductSkus });
    if (selectedProduct.id && selectedProduct.productSKUs.length > 0) {
      _setIsSelectedProductSKUsChanged(true);
      _setIsSelectedProductChanged(true);
      setIsProductInfoChanged(true);
    }
  };

  const resetSelectProductChanges = () => {
    _setSelectedProduct(null);
    setIsProductInfoChanged(false);
    _setIsSelectedProductChanged(false);
    _setIsSelectedProductDetailsChanged(false);
    _setIsSelectedProductSKUsChanged(false);
  };

  const value: ProductContextType = {
    productsLoading,
    setProductsLoading,
    selectedProductLoading,
    setSelectedProductLoading,
    products,
    setProducts,
    selectedProduct,
    setSelectedProduct,
    SizeChartImageIds,
    setSizeChartImageIds,
    sizeChartImages,
    setSizeChartImages,
    productError,
    setProductError,
    originalProductSKUs,
    setOriginalProductSKUs,
    isSelectedProductChanged,
    _setIsSelectedProductChanged,
    isSelectedProductDetailsChanged,
    isSelectedProductSKUsChanged,
    isProductInfoChanged,
    setIsProductInfoChanged,
    setProductDetails,
    setProductSKUs,
    resetSelectProductChanges,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => useContext(ProductContext) as ProductContextType;

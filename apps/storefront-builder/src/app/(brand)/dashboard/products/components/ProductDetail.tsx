"use client";

import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import HeaderActionsBar from "@/components/generic/HeaderActionsBar";
import { Label } from "@/components/homeScreen/sellers/components/Label";
import { useProductContext } from "@/provider/ProductProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { convertToProductStockList } from "@/utils/productSkuToProductStock";
import { SIZE_PROFILES } from "components/src/constant/product";
import { Product, ProductDetailType } from "components/src/interfaces";
import { InputFieldSize, InputFieldType } from "components/src/interfaces/InputField";
import { Dropdown, InputField2, showPopup } from "components/src/minor";
import { LoadingBar } from "components/src/minor/LoadingBar";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AddCategorySection } from "./AddCategorySection";
import { ProductImagesSection } from "./ProductImagesSection";
import { UploadSizeChart } from "./UploadSizeChart";

export const ProductDetailScreen = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { id } = useParams();
  const [sizeProfile, setSizeProfile] = useState<string | null>(product.sizeProfile || null);
  const { store, setIsModalOpen } = useStoreContext();
  const {
    selectedProduct,
    selectedProductLoading,
    productError,
    isProductInfoChanged,
    setSelectedProduct,
    setProductDetails,
    setProductSKUs,
    setOriginalProductSKUs,
    SizeChartImageIds,
    setSizeChartImageIds,
    sizeChartImages,
    setSizeChartImages,
  } = useProductContext();

  useEffect(() => {
    if (!id || !store?.id) return;

    if (id === "addProduct") {
      setSelectedProduct({ ...product, storeId: store.id });
    } else if (product && product.id) {
      setSelectedProduct(product);
      setOriginalProductSKUs(product.productSKUs);
      showPopup("warning", "Size profile cannot be changed ");
    }
  }, [id, store?.id, product?.id]);

  useEffect(() => {
    if (productError?.productDetails) showPopup("error", productError.productDetails);
    else if (productError?.productSKUs) showPopup("error", productError.productSKUs);
  }, [productError]);

  const handleProductChange = <K extends keyof Product>(key: K, value: Product[K]) => {
    if (!selectedProduct) return;
    const newSelectedProduct = { ...selectedProduct };
    newSelectedProduct[key] = value;
    setSelectedProduct(newSelectedProduct);
  };

  const handleRemoveTag = (index: number) => {
    if (!selectedProduct) return;
    const updatedProductDetails = [...selectedProduct.productDetails];
    updatedProductDetails.splice(index, 1);
    setSelectedProduct({ ...selectedProduct, productDetails: updatedProductDetails });
  };
  if (selectedProductLoading || !selectedProduct) return <LoadingBar />;
  const productStockList = convertToProductStockList(selectedProduct.productSKUs);

  const productDetails = selectedProduct ? selectedProduct.productDetails : product.productDetails;

  const categoryArray =
    productDetails?.reduce<{ name: string; originalIndex: number }[]>((acc, pd, index) => {
      if (pd.type === ProductDetailType.CATEGORY) {
        acc.push({
          name: pd.value, // change if the property is different
          originalIndex: index,
        });
      }
      return acc;
    }, []) || [];

  const productSubCategory =
    productDetails?.reduce<{ name: string; originalIndex: number }[]>((acc, pd, index) => {
      if (pd.type === ProductDetailType.SUB_CATEGORY) {
        acc.push({
          name: pd.value, // adjust if different
          originalIndex: index,
        });
      }
      return acc;
    }, []) || [];

  const productType =
    productDetails?.reduce<{ name: string; originalIndex: number }[]>((acc, pd, index) => {
      if (pd.type === ProductDetailType.PRODUCT_TYPE) {
        acc.push({
          name: pd.value, // adjust if different
          originalIndex: index,
        });
      }
      return acc;
    }, []) || [];

  return (
    <div className="h-full overflow-y-hidden p-1">
      <HeaderActionsBar
        text="Edit Product Details"
        showCancelButton
        onCancelClick={() => {
          if (isProductInfoChanged) {
            return setIsModalOpen(true);
          } else router.back();
        }}
      />
      <div className="flex h-full w-full px-2 pb-7">
        <div className="flex w-[45%] flex-col p-1">
          <WhiteBackgroundWrapper className="mb-2 w-full text-start text-xl font-medium">
            <div className="flex justify-between">
              <p className="heading-5-semibold">SKU Addition :</p>

              <Dropdown
                textSize="text-xs"
                disable={id !== "addProduct"}
                className="w-1/2"
                defaultOption={product?.sizeProfile || "Select Size Profile"}
                options={Object.keys(SIZE_PROFILES)}
                onSelect={value => {
                  setSelectedProduct({ ...selectedProduct, sizeProfile: value });
                  setSizeProfile(value);
                }}
                error={productError?.sizeProfile && productError?.sizeProfile}
              />
            </div>
          </WhiteBackgroundWrapper>
          <WhiteBackgroundWrapper className={`flex-1 overflow-y-auto ${!selectedProduct.sizeProfile ? "pointer-events-none opacity-50" : ""}`}>
            <div className="mb-2 w-full">
              <UploadSizeChart
                key={selectedProduct?.id || "new"}
                sizeChartId={selectedProduct.selectedSizeChartImageId}
                error={productError?.selectedSizeChartId}
                setSizeChartId={id => setSelectedProduct({ ...selectedProduct, selectedSizeChartImageId: id })}
                sizeChartImageIds={SizeChartImageIds}
                sizeChartImages={sizeChartImages || []}
                storeId={store.id!}
                setSizeChartImageIds={setSizeChartImageIds}
                setSizeChartImages={setSizeChartImages}
              />
            </div>
            <ProductImagesSection
              productId={selectedProduct.id}
              setSkus={setProductSKUs}
              productStockList={productStockList}
              profile={sizeProfile}
              key={selectedProduct?.id || "new"}
            />
          </WhiteBackgroundWrapper>
        </div>
        <div
          className={`flex w-[55%] flex-col items-center p-1 transition-all duration-300 ${!selectedProduct.productSKUs[0].imageIds.length ? "pointer-events-none opacity-50" : ""}`}
        >
          <WhiteBackgroundWrapper className="mb-2 w-full text-start text-xl font-medium">Basic Details :</WhiteBackgroundWrapper>

          <WhiteBackgroundWrapper className="flex w-full flex-col items-center rounded-[10px] font-medium">
            <div className="flex w-full">
              <div className="w-2/3 p-1">
                <Label>Product Name</Label>
                <InputField2
                  dataIndex={0}
                  type={InputFieldType.TEXT}
                  placeholder="Product Name"
                  onChange={e => handleProductChange("name", e.target.value)}
                  value={selectedProduct?.name}
                  errorMessage={productError?.name}
                />
              </div>

              <div className="w-1/3 p-1">
                <Label>Product Price</Label>
                <InputField2
                  dataIndex={1}
                  type={InputFieldType.TEXT}
                  placeholder="999"
                  onChange={e => handleProductChange("price", Number(e.target.value))}
                  value={selectedProduct?.price}
                  errorMessage={productError?.price}
                />
              </div>
            </div>

            <div className="flex w-full">
              <div className="w-2/3 p-1">
                <AddCategorySection
                  removeTag={index => handleRemoveTag(index)}
                  label="Product Type"
                  placeHolder="Summer, Oversized"
                  productDetails={productType}
                  productTypeValue={ProductDetailType.PRODUCT_TYPE}
                  setDetails={setProductDetails}
                />
              </div>

              <div className="w-1/3 p-1">
                <Label>Product Weight</Label>
                <Dropdown
                  key={selectedProduct?.id || "new"}
                  onSelect={value => {
                    const numericValue = parseFloat(value);
                    setSelectedProduct({
                      ...selectedProduct,
                      weightInGrams: numericValue * 1000,
                    });
                  }}
                  options={["0.5kg", "1kg", "1.5kg", "2kg", "2.5kg"]}
                  defaultOption={selectedProduct?.weightInGrams ? `${selectedProduct.weightInGrams / 1000}kg` : "weight"}
                />
              </div>
            </div>

            <div className="flex w-full">
              <div className="w-1/2 p-1">
                <AddCategorySection
                  removeTag={index => handleRemoveTag(index)}
                  label="Category Tags"
                  placeHolder="Summer, Oversized"
                  productDetails={categoryArray}
                  productTypeValue={ProductDetailType.CATEGORY}
                  setDetails={setProductDetails}
                />
              </div>

              <div className="w-1/2 p-1">
                <AddCategorySection
                  removeTag={index => handleRemoveTag(index)}
                  label="Sub Category"
                  placeHolder="Oxford shirt"
                  productDetails={productSubCategory}
                  productTypeValue={ProductDetailType.SUB_CATEGORY}
                  setDetails={setProductDetails}
                />
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-1/2 p-1">
                <Label>Product Description</Label>
                <InputField2
                  resizable
                  rows={4}
                  type={InputFieldType.TEXT}
                  size={InputFieldSize.LARGE}
                  placeholder="Shirt in Oxford cotton with a button-down collar, classic front, yoke at the back and an open chest pocket."
                  onChange={e => handleProductChange("shortDescription", e.target.value)}
                  value={selectedProduct?.shortDescription}
                  errorMessage={productError?.shortDescription}
                />
              </div>

              <div className="w-1/2 p-1">
                <Label>Product Details</Label>
                <InputField2
                  resizable
                  rows={4}
                  type={InputFieldType.TEXT}
                  placeholder="Length: Regular length Sleeve Length: Long sleeve Fit: Regular fit Collar: Button-down collar"
                  onChange={e => handleProductChange("description", e.target.value)}
                  value={selectedProduct?.description}
                  errorMessage={productError?.description}
                />
              </div>
            </div>
          </WhiteBackgroundWrapper>
        </div>
      </div>
    </div>
  );
};

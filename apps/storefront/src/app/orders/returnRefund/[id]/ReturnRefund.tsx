"use client";

import { validateExchangeRequest } from "@/services/validators/exchange.validator";
import { Loader } from "@/utils/loader";
import { getAdjustedPrice } from "@/utils/orders";
import { convertToProductStockList } from "@/utils/product";
import { CreateProductSku, Product, ProductSKU, UploadedFile } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { ExchangeError, ExchangeRequest, Order, ReturnRefundAction } from "components/src/interfaces/orders";
import { showPopup } from "components/src/minor";
import { getProductDetailsById } from "components/src/services/api";
import { exchangeOrder } from "components/src/services/api/orders";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActionType } from "./components/ActionSelector";
import OrderAndItemDetails from "./components/OrderAndItemDetails";
import ReasonSelector, { ReasonType } from "./components/ReasonSelector";

interface ReturnRefundProps {
  order: Order | undefined;
  index: number;
}

const ActionSelector = dynamic(() => import("./components/ActionSelector"), { ssr: false });
const ExchangeProduct = dynamic(() => import("./components/ExchangeProduct"), { ssr: false });
const ImageUploadSection = dynamic(() => import("./components/ImageUploadSection"), { ssr: false });
const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });
const Button2 = dynamic(() => import("components/src/minor").then(mod => mod.Button2), { ssr: false });

const ReturnRefund: React.FC<ReturnRefundProps> = ({ order, index }) => {
  const [selectedAction, setSelectedAction] = useState<ActionType>(ReturnRefundAction.EXCHANGE);
  const [reason, setReason] = useState<ReasonType>("The product quality is unsatisfactory.");
  const [description, setDescription] = useState("");
  const [exchange, setExchange] = useState<ExchangeRequest | null>(null);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<UploadedFile[] | null>(null);
  const [error, setError] = useState<ExchangeError | null>(null);
  const [selectedSku, setSelectedSku] = useState<ProductSKU | null>(null);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [productSku, setProductSku] = useState<CreateProductSku[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const cartItem = useMemo(() => order?.cart?.cartItems?.[index] ?? null, [order, index]);
  const router = useRouter();

  const matchingItems = useMemo(() => {
    return order?.cart?.cartItems?.filter(item => item.storeId === order.store.id) ?? [];
  }, [order]);

  const adjustedPrice = useMemo(() => {
    if (!order || !cartItem) return 0;
    return getAdjustedPrice(order, cartItem, matchingItems, index);
  }, [order, cartItem, matchingItems, index]);

  useEffect(() => {
    if (reason === "Others" && !description) {
      setExchange({
        returnReason: "",
        itemsToExchange: [],
      });
      return;
    }

    const returnReason = reason === "Others" ? description : reason;

    if (selectedSku?.id && selectedSku.size) {
      setExchange({
        returnReason,
        itemsToExchange: [
          {
            productSkuId: selectedSku.id,
            qcColor: selectedSku.color,
            qcSize: selectedSku.size,
            quantity: 1,
            replacingSkuId: cartItem?.productSKU.id || "",
            replacingSkuName: product?.name || "",
            qcImageUrl: imageUrl?.[0]?.fileUrl || "",
            qcBrand: cartItem?.store.name || "",
          },
        ],
      });
    } else {
      setExchange({
        returnReason,
        itemsToExchange: [],
      });
    }
  }, [reason, description, selectedColor, selectedSku, product?.name, imageUrl, cartItem?.store.name, cartItem?.productSKU.id]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cartItem?.product.id) {
        setOrderLoading(true);
        const { data, error } = await getProductDetailsById(cartItem.product.id);
        setOrderLoading(false);
        if (!data || error) {
          return;
        } else {
          setProduct(data);
          const productSkuList = convertToProductStockList(data.productSKUs);
          if (productSkuList.length > 0) {
            setProductSku(productSkuList);
          }
        }
      }
    };
    fetchProductDetails();
  }, [cartItem?.product?.id, setOrderLoading]);

  const handleActionSubmit = async () => {
    if (order && cartItem) {
      if (selectedAction === ReturnRefundAction.EXCHANGE) {
        if (!exchange) {
          showPopup("error", "Please fill all the required fields.");
          return;
        }

        const validationResult = validateExchangeRequest(exchange);
        if (validationResult) {
          setError(validationResult);
          showPopup("error", "Please fill all the required fields.");
          return;
        }
        setError(null);

        const { data, error } = await exchangeOrder(order.id, exchange);
        if (!data || error) {
          showPopup("error", "Failed to initiate exchange. Please try again.");
          return;
        }
        router.back();
      }
    }
  };

  const handleSkuSelect = useCallback(
    (sku: ProductSKU | null) => {
      if (sku) {
        setSelectedSku(sku);
      } else {
        setSelectedSku(null);
      }
    },
    [selectedSku],
  );

  if (orderLoading) {
    return <Loader />;
  }

  if (!order || !cartItem) {
    return <ErrorPage description={`Order  not found.`} />;
  }

  const updateImage = (image: UploadedFile, remove?: boolean) => {
    if (remove) {
      setImageUrl(prev => {
        if (prev) {
          return prev.filter(img => img.id !== image.id);
        } else {
          return null;
        }
      });
      setUploadedImages(prev => prev.filter(img => img.id !== image.id));
    } else if (typeof image.id === "string") {
      setImageUrl(prev => {
        if (prev) {
          return [...prev, image];
        } else {
          return [image];
        }
      });
      setUploadedImages(prev => [...prev, image]);
    }
  };

  return (
    <div className="bg-white w-full rounded-lg p-6 px-[5vw] shadow-md">
      <OrderAndItemDetails order={order} cartItem={cartItem} adjustedPrice={adjustedPrice} />

      <ActionSelector selectedAction={selectedAction} onActionChange={setSelectedAction} />

      <ReasonSelector
        selectedReason={reason}
        onReasonChange={setReason}
        description={description}
        onDescriptionChange={setDescription}
        error={error?.returnReason}
      />

      <ImageUploadSection
        images={uploadedImages}
        selectedAction={selectedAction}
        updateImage={updateImage}
        error={error?.itemsToExchange?.itemErrors?.[0]?.qcImageUrl}
      />

      {selectedAction === ReturnRefundAction.EXCHANGE && product && (
        <ExchangeProduct
          productSku={productSku}
          primaryColor={cartItem.store.primaryColor}
          product={product}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          selectedSku={selectedSku}
          onSkuSelect={handleSkuSelect}
          error={error?.itemsToExchange?.general}
        />
      )}

      {/* Submit Button */}
      <div className="mx-auto flex w-full justify-center">
        {" "}
        {/* Added padding top */}
        <Button2 type={ButtonType.PRIMARY} className="!w-auto" label="Initiate Exchange" buttonSize="lg" handleClick={handleActionSubmit} />
      </div>
    </div>
  );
};

export default ReturnRefund;

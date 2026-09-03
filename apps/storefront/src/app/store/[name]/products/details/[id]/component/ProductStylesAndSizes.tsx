"use client";

import Share from "components/src/icons/iconFiles/Share.svg?component";
import { CreateProductSku, Product, ProductSKU } from "components/src/interfaces/product";
import { showPopup } from "components/src/minor/Popups";
import { getEnvironmentInfo } from "components/src/utils/domain";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";

interface ProductStylesAndSizesProps {
  product: Product;
  productSku: CreateProductSku[];
  onSkuSelect: (sku: ProductSKU | null) => void;
  selectedColor: number;
  onSelectColor: (color: number) => void;
  primaryColor?: string;
}

const SizeChart = dynamic(() => import("../../../component/SizeChart"), { ssr: false });
const SizeOption = dynamic(() => import("./SizeOption"), { ssr: false });

const ProductStylesAndSizes: React.FC<ProductStylesAndSizesProps> = ({
  product,
  productSku,
  onSkuSelect,
  selectedColor,
  onSelectColor,
  primaryColor,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const availableSizes = useMemo(() => {
    if (!productSku?.[selectedColor]) return [];
    return Array.from(new Set(productSku[selectedColor].productStock.filter(stock => stock.quantity > 0).map(stock => stock.size))).sort();
  }, [productSku, selectedColor]);

  const handleSelectColor = (key: string) => {
    const selectedIndex = productSku.findIndex(sku => sku.skuCombineKey === key);
    onSelectColor(selectedIndex);
    setSelectedSize("");
  };

  const handleSizeSelect = (size: string) => {
    const skuId = productSku[selectedColor].productStock.find(stock => stock.size === size)?.id;

    const selected = product.productSKUs.find(sku => sku.id === skuId);

    if (selectedSize === size) {
      setSelectedSize("");
      onSkuSelect(null);
    } else if (selected) {
      onSkuSelect(selected);
      setSelectedSize(size);
    }
  };

  const handleShare = useCallback((product: Product) => {
    const shareText = `Check out this product: ${product.name}`;

    const { baseDomain, port, subdomain, protocol } = getEnvironmentInfo();

    const domain = subdomain ? `${subdomain}.${baseDomain}` : `${baseDomain}`;
    const shareUrl = `${protocol}://${domain}${port}/products/details/${product.id}`;

    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        })
        .catch(error => showPopup("error", `Error sharing product: ${error}`));
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
      window.open(whatsappUrl, "_blank");
    }
  }, []);

  return (
    <div className="w-full">
      {productSku && productSku.length > 0 && <h4 className="text-gray-900 py-2 text-2xl font-semibold">Styles</h4>}

      <div className="flex w-full items-start justify-start gap-2 py-2">
        <div className="flex w-full flex-nowrap justify-start gap-2 overflow-x-auto px-2 sm:max-w-[80vw]">
          {productSku &&
            productSku.map((sku, index) => (
              <div key={index} className="gap-2 overflow-x-auto">
                <div
                  className={`relative aspect-square h-[4em] cursor-pointer rounded-full shadow-md lg:h-[72px]`}
                  onClick={() => handleSelectColor(sku.skuCombineKey || "")}
                >
                  <Image
                    src={sku.images[0].fileUrl}
                    alt={`${sku.images[0].fileName} -${index}`}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <p className="text-center text-sm font-semibold">Style {index + 1}</p>
              </div>
            ))}
        </div>
        <div
          className="flex aspect-square h-full max-h-14 w-full max-w-14 cursor-pointer items-center justify-center rounded-full p-2 hover:shadow-lg"
          onClick={() => handleShare && handleShare(product)}
          style={{ backgroundColor: primaryColor }}
        >
          <Share className="h-full w-full object-contain text-white-light4" />
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        <h4 className="text-gray-900 text-2xl font-semibold">Size (inc)</h4>
        {product.selectedSizeChartImage?.fileUrl && (
          <SizeChart primaryColor={primaryColor} imageUrl={product.selectedSizeChartImage?.fileUrl} alt={product.selectedSizeChartImage.fileName} />
        )}
      </div>
      <div className="scrollbar-hide flex max-w-[80vw] flex-nowrap justify-start gap-2 overflow-x-auto p-2">
        {availableSizes.map(size =>
          size ? (
            <SizeOption key={size} size={size} selected={selectedSize === size} onClick={() => handleSizeSelect(size)} primaryColor={primaryColor} />
          ) : null,
        )}
      </div>
    </div>
  );
};
export default ProductStylesAndSizes;

import gsap from "gsap/all";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";
import OverLay from "../../icons/iconFiles/SoldOutOverlays.png";
import {
  ProductStatusEnum,
  SimpleProduct,
  StorefrontActions,
  StorefrontComponentData,
  StorefrontComponentType,
  StorefrontHandlerFunction,
  UploadedFile,
  WishlistItems,
} from "../../interfaces";
import ImageSkeletonLoader from "../../major/ImageSkeletonLoader";
import { IconButton } from "../../minor";
import { createStorefrontData } from "../../services/storefront";
import { PRODUCT_GRID_PREVIEW_DATA } from "../data";

type ProductGridProps = {
  data?: StorefrontComponentData;
  handlerFunction?: StorefrontHandlerFunction;
  wishlistItems?: WishlistItems[];
};

export const ProductGrid: React.FC<ProductGridProps> = ({ data, handlerFunction, wishlistItems }) => {
  const DEFAULT_PRODUCTS_PER_ROW = 4;
  const MOBILE_PRODUCTS_PER_ROW = 2;

  useScrollFadeIn({
    selector: ".product-card",
    scale: 1,
    stagger: 0.05,
    duration: 0.6,
    delay: 0,
  });

  const products = data?.products;
  const primaryColor = data?.store?.primaryColor;

  const initialLikedProducts = useMemo(() => {
    return wishlistItems?.map(item => item.product.id).filter(Boolean) || [];
  }, [wishlistItems]);

  const [showMoreCard, setShowMoreCard] = useState<boolean>(false);
  const [productsPerRow, setProductsPerRow] = useState<number>(2);
  const [rows, setRows] = useState<number>(0);

  useEffect(() => {
    const updateProductsPerRow = () => {
      setProductsPerRow(window.innerWidth < 768 ? MOBILE_PRODUCTS_PER_ROW : DEFAULT_PRODUCTS_PER_ROW);
    };

    updateProductsPerRow();
    window.addEventListener("resize", updateProductsPerRow);

    return () => window.removeEventListener("resize", updateProductsPerRow);
  }, []);

  const length = products?.length;
  useEffect(() => {
    if (length && length > 0) {
      const calculatedRows = Math.ceil(length / productsPerRow);
      setRows(calculatedRows);
    }
  }, [productsPerRow]);

  useEffect(() => {
    if (length && length > 0) {
      if ((productsPerRow === 4 && length > 8) || (productsPerRow === 2 && length > 4) || (rows * productsPerRow > length && rows !== 1)) {
        setShowMoreCard(true);
      } else {
        setShowMoreCard(false);
      }
    }
  }, [rows, productsPerRow, length]);

  if (data?.products.length === 0 || !length) return null;

  const adjustedProducts =
    showMoreCard && length > (productsPerRow === 2 ? 2 : 4)
      ? products.slice(0, length > (productsPerRow === 2 ? 4 : 8) ? (productsPerRow === 2 ? 4 : 8) : productsPerRow * (rows - 1))
      : products;

  return (
    <div className="mx-auto flex h-full w-full max-w-[1300px] flex-col items-center">
      <div
        className={`w-full place-content-center gap-4 p-2 ${
          length < 4 && productsPerRow === 4 ? "flex justify-center" : "grid grid-cols-2 md:grid-cols-4"
        }`}
      >
        {adjustedProducts.map((product, index) => {
          const isLiked = initialLikedProducts.includes(product.id!);

          // if (!product.image) return null;

          return (
            <div
              key={index}
              className={`product-card relative flex min-w-32 max-w-[300px] cursor-pointer flex-col items-center rounded-2xl ${
                length < 4 && productsPerRow === 4 ? "w-[17vw]" : "w-full"
              }`}
            >
              <ProductCard
                product={product}
                isLiked={isLiked}
                backgroundColor={primaryColor}
                onProductClick={() =>
                  handlerFunction?.(
                    StorefrontActions.PRODUCT_PRESS,
                    createStorefrontData({ products: [product] }),
                    StorefrontComponentType.PRODUCT_GRID,
                  )
                }
                onWishlistToggle={e => {
                  e.stopPropagation();
                  if (product.id) {
                    handlerFunction?.(
                      StorefrontActions.ADD_TO_WISHLIST,
                      createStorefrontData({ products: [product] }),
                      StorefrontComponentType.PRODUCT_GRID,
                    );
                  }
                }}
              />
            </div>
          );
        })}
      </div>
      {showMoreCard && (
        <>
          <button
            className="group relative my-4 overflow-hidden rounded-md border-2 px-6 py-2 font-semibold transition-colors duration-300 ease-in-out"
            style={{
              borderColor: primaryColor || "transparent",
              color: primaryColor || "inherit",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = primaryColor || "";
              e.currentTarget.style.color = "#FAFAFC";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.color = primaryColor || "inherit";
            }}
            onClick={() => {
              handlerFunction?.(
                StorefrontActions.PRODUCTS_PRESS,
                createStorefrontData({ products: [...products] }),
                StorefrontComponentType.PRODUCT_GRID,
              );
            }}
          >
            <span className="group-hover:text-white relative z-10 transition-colors duration-300">View More</span>
            <span
              className="absolute inset-0 z-0 origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ backgroundColor: primaryColor }}
            />
          </button>
        </>
      )}
    </div>
  );
};

export const AllProductGrid: React.FC<ProductGridProps> = ({ data, handlerFunction, wishlistItems }) => {
  const products = data?.products?.length ? data : PRODUCT_GRID_PREVIEW_DATA;

  const initialLikedProducts = useMemo(() => {
    return wishlistItems?.map(item => item.product.id).filter(Boolean) || [];
  }, [wishlistItems]);

  useScrollFadeIn({
    selector: ".all-product-card",
    scale: 1,
    stagger: 0.06,
    duration: 0.6,
    delay: 0,
  });

  const gridClassNames =
    "grid grid-cols-2 place-items-center gap-2 lg:grid-cols-[repeat(auto-fill,_minmax(15vw,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(18vw,_1fr))]";

  return (
    <div className={`h-full w-full place-items-center gap-2 ${gridClassNames}`}>
      {products.products.map((product, index) => {
        const isLiked = initialLikedProducts.includes(product.id!);
        const backgroundColor = products?.store?.primaryColor || wishlistItems?.[index]?.store?.primaryColor || "#7C54E9";
        const productImage = wishlistItems?.[index]?.productSKU?.images?.[0];

        return (
          <ProductCard
            className="all-product-card"
            key={product.id || index}
            product={product}
            productImage={productImage}
            isLiked={isLiked}
            backgroundColor={backgroundColor}
            onProductClick={() =>
              handlerFunction?.(
                StorefrontActions.PRODUCT_PRESS,
                createStorefrontData({ products: [product], store: wishlistItems?.[index]?.store }),
                StorefrontComponentType.PRODUCT_GRID,
              )
            }
            onWishlistToggle={e => {
              e.stopPropagation();
              if (product.id) {
                handlerFunction?.(
                  StorefrontActions.ADD_TO_WISHLIST,
                  createStorefrontData({ products: [product] }),
                  StorefrontComponentType.PRODUCT_GRID,
                );
              }
            }}
          />
        );
      })}
    </div>
  );
};

interface ProductCardProps {
  product: SimpleProduct;
  productImage?: UploadedFile;
  isLiked?: boolean;
  onProductClick?: () => void;
  onWishlistToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  backgroundColor?: string;
  textSize?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLiked,
  productImage,
  onProductClick,
  onWishlistToggle,
  backgroundColor,
  textSize,
  className,
}) => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (isLiked) {
      const targetClass = `.like-icon-${product.id}`;
      gsap.fromTo(
        targetClass,
        { scale: 1 },
        {
          scale: 1.6,
          duration: 0.2,
          ease: "power1.out",
          onComplete: () => {
            gsap.to(targetClass, {
              scale: 1,
              duration: 0.3,
              ease: "elastic.out(1.2, 0.4)",
            });
          },
        },
      );
    }
  }, [isLiked, product.id]);

  // if (!product.image) return null;

  return (
    <div className={`flex h-full w-full cursor-pointer flex-col items-stretch ${className}`}>
      <div className="relative flex w-full" style={{ aspectRatio: "1/1.6" }} onClick={onProductClick}>
        {loader && <ImageSkeletonLoader />}
        {(() => {
          const isOutOfStock = product.isOutOfStock || product.status === ProductStatusEnum.DISABLED;
          let availableSKU;

          if (isOutOfStock) {
            availableSKU = product?.productSKUs?.[0];
          } else {
            availableSKU = product?.productSKUs?.find(sku => sku.quantity > 0);
          }
          const availableProductImage = availableSKU?.images?.[0]?.fileUrl || "";

          return (
            <>
              <Image
                src={productImage?.fileUrl || availableProductImage}
                alt={product.name || "Product Image"}
                draggable={false}
                onLoad={() => setLoader(false)}
                className={`h-full w-full rounded-[10px] object-cover transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100 ${
                  loader ? "hidden" : ""
                }`}
                fill
                placeholder="empty"
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                priority
                style={{ aspectRatio: "1/1.6" }}
              />

              {isOutOfStock && (
                <div className="absolute z-10 flex h-full w-full items-center justify-center">
                  <Image
                    src={OverLay}
                    draggable={false}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    alt="Product is Sold Out"
                    className="h-full w-full rounded-[10px] object-cover"
                    fill
                    priority
                  />
                </div>
              )}
            </>
          );
        })()}
      </div>
      <div className="my-2 h-1 w-full rounded-[4px]" style={{ backgroundColor }}></div>
      <div className="relative w-full grid-rows-2 sm:grid">
        <div className="row-span-1 flex justify-between">
          <div className="line-clamp-2 flex-1">
            <span className={`block text-sm font-medium text-black-dark1 ${textSize ? textSize : "sm:text-[1.2vw]"}`}>{product.name}</span>
          </div>
          <IconButton
            icon={isLiked ? IoMdHeart : IoMdHeartEmpty}
            size={24}
            buttonStyle={`like-icon-${product.id} transition-transform duration-300 ease-in-out ${isLiked ? "text-red-500" : "text-black-dark1"}`}
            onClick={onWishlistToggle}
          />
        </div>
        <div className="row-span-1 flex">
          <span
            className="m-1 text-xs font-extrabold text-black-dark1 sm:text-[1.2vw]"
            style={{ color: backgroundColor ? backgroundColor : "#121212" }}
          >
            {product.discountedPrice ? `₹${product.discountedPrice}` : `₹${product.price}`}
          </span>
          {product.discountedPrice && <span className="text-gray-500 m-1 text-xs font-extrabold line-through">₹{product.price}</span>}
        </div>
      </div>
    </div>
  );
};

export const FeedVideoCard: React.FC<ProductGridProps> = ({ data, handlerFunction, wishlistItems }) => {
  const products = data?.products?.length ? data : PRODUCT_GRID_PREVIEW_DATA;

  const initialLikedProducts = useMemo(() => {
    return wishlistItems?.map(item => item.product.id).filter(Boolean) || [];
  }, [wishlistItems]);

  return (
    <div className="mx-auto grid h-full w-full grid-cols-3 place-items-start gap-2 p-1 sm:max-w-[60vw] sm:grid-cols-[repeat(auto-fill,_minmax(15vw,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(10vw,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(8vw,_1fr))]">
      {products.products.map((product, index) => {
        const isLiked = initialLikedProducts.includes(product.id!);
        const backgroundColor = products?.store?.primaryColor || wishlistItems?.[index]?.store?.primaryColor || "#7C54E9";

        return (
          <div key={product.id || index} className="w-full">
            <ProductCard
              product={product}
              isLiked={isLiked}
              textSize="md:text-[0.9vw]"
              backgroundColor={backgroundColor}
              onProductClick={() =>
                handlerFunction?.(
                  StorefrontActions.PRODUCT_PRESS,
                  createStorefrontData({ products: [product], store: wishlistItems?.[index]?.store }),
                  StorefrontComponentType.PRODUCT_GRID,
                )
              }
              onWishlistToggle={e => {
                e.stopPropagation();
                if (product.id) {
                  handlerFunction?.(
                    StorefrontActions.ADD_TO_WISHLIST,
                    createStorefrontData({ products: [product] }),
                    StorefrontComponentType.PRODUCT_GRID,
                  );
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

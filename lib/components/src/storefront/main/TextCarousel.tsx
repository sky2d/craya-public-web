import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking/dist/flicking.css";
import React, { useState } from "react";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";
import { StorefrontActions, StorefrontComponentProps, StorefrontComponentType } from "../../interfaces";
import { createStorefrontData } from "../../services/storefront";

export const TextCarousel: React.FC<StorefrontComponentProps> = ({ data, handlerFunction, products }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const carouselData = data;

  useScrollFadeIn({
    selector: ".text-card",
    scale: 1,
    stagger: 0.05,
    duration: 0.15,
    delay: 0,
  });

  if (!carouselData) return null;

  const { texts, store } = carouselData;
  const primaryColor = store?.primaryColor;

  return (
    <div className="flex w-full justify-center">
      <div className="scrollbar-hide inline-flex max-w-full items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap px-4 py-2">
        {texts.map((text, index) => {
          const isHovered = hoveredIndex === index;
          const cardStyle = {
            borderColor: primaryColor || "transparent",
            color: isHovered ? "#FAFAFC" : primaryColor || "inherit",
            backgroundColor: isHovered ? primaryColor : "#ffffff",
            whiteSpace: "nowrap" as const,
          };

          return (
            <div
              key={index}
              className="text-card flex scale-[0.95] items-center justify-center rounded-md border px-4 py-1 text-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:cursor-pointer"
              style={cardStyle}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                if (handlerFunction) {
                  const filteredProducts = products?.filter(product => product.id && data?.productsPerImage[index]?.includes(product.id));
                  handlerFunction(
                    StorefrontActions.PRODUCTS_PRESS,
                    createStorefrontData({ products: filteredProducts }),
                    StorefrontComponentType.PRODUCT_GRID,
                  );
                }
              }}
            >
              <span className="truncate text-xs sm:text-lg">{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

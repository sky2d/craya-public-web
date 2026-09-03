import { Drawer } from "antd";
import React from "react";
import { StorefrontComponentData, StorefrontHandlerFunction, WishlistItems } from "../../interfaces";
import { FeedVideoCard } from "../../storefront/main/ProductGrid";

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  storefrontData?: StorefrontComponentData;
  wishlistItems?: WishlistItems[];
  handlerFunction?: StorefrontHandlerFunction;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({ isOpen, onClose, storefrontData, wishlistItems, handlerFunction }) => {
  // Render only if there are products
  if (!storefrontData?.products || storefrontData.products.length === 0) {
    return null;
  }

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      getContainer={false} // Keep drawer within the card's DOM structure
      styles={{ body: { padding: 0 } }}
      placement="bottom"
      closable={false}
      height="50%"
      destroyOnClose // Unmount grid when closed
      style={{
        position: "absolute",
        zIndex: 1000,
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        overflow: "hidden",
        WebkitOverflowScrolling: "touch",
        pointerEvents: "auto", // force pointer events on top
      }}
      zIndex={1000} // May not be needed if positioned correctly
    >
      <div className="z-[1000] h-full w-full rounded-t-[11px] bg-white-light4">
        {" "}
        {/* Adjusted bg-white-light4 */}
        <p className="rounded-t-[11px] bg-[#AC1E2E] px-2 py-1 text-center text-xl font-medium text-white-light4">Products</p>{" "}
        {/* Adjusted text-white-light4, added padding */}
        <div
          className="h-[calc(100%-theme(spacing.10))] overflow-y-auto p-2"
          onWheel={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
        >
          {" "}
          {/* Adjust height based on header, ensure scrolling */}
          <FeedVideoCard data={storefrontData} wishlistItems={wishlistItems} handlerFunction={handlerFunction} />
        </div>
      </div>
    </Drawer>
  );
};

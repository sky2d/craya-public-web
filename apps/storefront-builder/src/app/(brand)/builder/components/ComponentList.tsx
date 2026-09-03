"use client";

import { useBuilderContext } from "@/provider/BuilderProvider";
import { useProductContext } from "@/provider/ProductProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { builderComponentMapping } from "components/src/constant/storefront";
import { ImageSizeType, Presence, StorefrontComponentData, StorefrontComponentType } from "components/src/interfaces";
import { createStorefrontData } from "components/src/services/storefront";
import { DraggedItem } from "./DraggedItem";

const DraggableComponent: React.FC<{
  type: StorefrontComponentType;
  previewData?: StorefrontComponentData;
  initialData: StorefrontComponentData;
}> = ({ type, previewData, initialData }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: type,
    data: { type, initialData, previewData },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      key={type}
      style={style}
      className={`"cursor-pointer" mt-3 rounded-lg border-2 border-brand-color1 bg-white-light4`}
    >
      <DraggedItem type={type} />
    </div>
  );
};

export const ComponentList = () => {
  const { store } = useStoreContext();
  const { products } = useProductContext();
  const { loops, coupons } = useBuilderContext();

  const videoFeedData = loops.filter(loop => loop.presence === Presence.FEED);
  const shoppableCarouselData = loops.filter(loop => loop.presence === Presence.CAROUSEL);

  return (
    <div>
      {Array.from(builderComponentMapping.entries()).map(([type, { initialData }]) => {
        let newInitialData;
        let previewData;

        if (type === StorefrontComponentType.BRAND_INFO) {
          previewData = createStorefrontData({ store });
        }
        if (type === StorefrontComponentType.HEADING_TEXT) {
          previewData = createStorefrontData({ store, imageSize: ImageSizeType.SMALL, texts: ["Lorem Ipsum"] });
        }

        if (type === StorefrontComponentType.BRAND_INFO) {
          newInitialData = createStorefrontData({ store });
        } else if (type === StorefrontComponentType.PRODUCT_GRID) {
          newInitialData = createStorefrontData({ products });
        } else if (type === StorefrontComponentType.HEADING_TEXT) {
          newInitialData = createStorefrontData({ store, imageSize: ImageSizeType.SMALL, texts: [""] });
        } else if (type === StorefrontComponentType.SHOPPABLE_CAROUSEL) {
          newInitialData = createStorefrontData({ loops: shoppableCarouselData });
        } else if (type === StorefrontComponentType.SHOPPABLE_VIDEO_FEED) {
          newInitialData = createStorefrontData({ loops: videoFeedData });
        } else if (type === StorefrontComponentType.COUPONS) {
          newInitialData = createStorefrontData({ coupons: coupons });
        } else {
          newInitialData = initialData || createStorefrontData({});
        }
        return <DraggableComponent key={type} type={type} initialData={newInitialData} previewData={previewData} />;
      })}
    </div>
  );
};

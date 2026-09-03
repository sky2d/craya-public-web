"use client";
import { tooltipContent } from "@/constant/tooltipContent";
import { useBuilderContext } from "@/provider/BuilderProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { StorefrontComponentType } from "components/src/interfaces";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const formatText = (text: string) => {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className="font-bold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
};

export const TooltipScreen = () => {
  const { newStorefrontComponent } = useBuilderContext();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const { store } = useStoreContext();
  const componentType = newStorefrontComponent?.type;

  const isComponentTypeTooltip =
    pathname?.includes("/builder") &&
    newStorefrontComponent &&
    (componentType === StorefrontComponentType.BRAND_INFO ||
      componentType === StorefrontComponentType.IMAGE_CAROUSEL ||
      componentType === StorefrontComponentType.IMAGES_GRID);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  const getContent = () => {
    if (isComponentTypeTooltip) {
      // Handle the componentType content separately
      const content = tooltipContent.componentType?.[componentType];
      if (content) {
        return content;
      }
      return null; // Return null if no content for that type
    }
    if (pathname?.includes("/builder")) {
      return tooltipContent.builder;
    }
    if (pathname?.includes("/products/addProduct")) {
      return tooltipContent.productsDetail;
    }
    if (pathname?.includes("/products")) {
      return store.isOnboarding ? tooltipContent.products : tooltipContent.productsOnboarded;
    }
    if (pathname?.includes("/continue-editing")) {
      return tooltipContent.continueEditing;
    }
    if (pathname?.includes("/link")) {
      return tooltipContent.link;
    }
    if (pathname?.includes("/store")) {
      return store.isOnboarding ? tooltipContent.dashboardOnboarding : tooltipContent.storeOnboarded;
    }
    if (pathname?.includes("/")) {
      return tooltipContent.dashboardOnboarded;
    }
    return null;
  };

  const currentContent = getContent();
  if (!currentContent) return null;

  if (loading) {
    return (
      <div className="mx-2 h-full overflow-y-auto rounded-lg bg-white-light4 p-2 sm:overflow-x-hidden">
        <div className="mb-4 h-32 animate-pulse rounded-lg bg-brand-color1" />
        <div className="space-y-4">
          {[1, 2].map(index => (
            <div key={index} className="bg-gray-200 h-24 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto rounded-xl bg-[#FFFFFF] p-2 sm:overflow-x-hidden">
      {/* Handle yellow and primary sections separately */}
      {currentContent.yellow?.map(({ heading, image, text }, index) => (
        <div key={`yellow-${index}`} className="mb-4 h-fit rounded-lg bg-yellow-400 p-2">
          {heading && <h3 className="text-black mb-2 text-base font-extrabold">{heading}</h3>}
          {image && <Image src={image} alt="Guide illustration" width={400} height={300} className="w-full rounded-lg object-cover" />}
          <p className="text-black my-4 body-sm">{text}</p>
        </div>
      ))}

      {currentContent.primary?.map(({ heading, image, text, gridImages }, index) => {
        const imagesExist = newStorefrontComponent && newStorefrontComponent.data.images.length;
        const imageLength = imagesExist && newStorefrontComponent.data.images.length;
        const matchedGridImage = gridImages?.find(grid => grid.noOfImages === imageLength);

        return (
          <div key={`primary-${index}`} className="mb-4 h-fit rounded-lg border-2 border-brand-color1 p-2">
            {gridImages && matchedGridImage ? (
              <div className="flex items-center justify-center">
                <Image src={matchedGridImage?.image} alt="Guide illustration" width={150} height={150} />
              </div>
            ) : (
              heading && <h3 className="mb-1 text-base font-semibold text-brand-color1">{heading}</h3>
            )}
            {image && <Image src={image} alt="Guide illustration" width={400} height={300} className="w-full rounded-lg object-cover" />}

            {text && <p className="mt-1 text-sm text-brand-color1">{formatText(text)}</p>}
          </div>
        );
      })}

      {/* Handle componentType-specific content separately */}
      {isComponentTypeTooltip && (
        <>
          <div className="mb-4 h-fit rounded-lg bg-brand-color1 p-2">
            <h3 className="mb-2 text-base font-extrabold text-white-light4">Add Components</h3>
            <p className="my-4 text-white-light4 body-sm">
              Drag and drop elements from the right to make them a part of your storefront, you will be prompted to give details required by the
              component. Fill these and see your component live.
            </p>
          </div>

          <div className="mb-4 h-fit rounded-lg bg-brand-color1 p-2">
            <h3 className="mb-2 text-base font-extrabold text-white-light4">Make It Yours</h3>
            <p className="my-4 text-white-light4 body-sm">
              You have all the control over the components. Aside from a few components, you can add any component as many times as you want and by
              dragging the dots over each component you can reorder them.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default TooltipScreen;

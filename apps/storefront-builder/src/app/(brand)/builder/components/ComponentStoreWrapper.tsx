"use client";

import { useBuilderContext } from "@/provider/BuilderProvider";
import { useProductContext } from "@/provider/ProductProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { componentTypeCheck } from "@/utils/componentTypeCheck";
import { validateStorefrontComponent } from "@/utils/validateStorefrontComponent";
import { builderComponentMapping } from "components/src/constant/storefront";
import { StorefrontComponentType } from "components/src/interfaces";

import previewInfo from "components/src/icons/popupImages/storeFrontBuilder/previewInfo.svg";
import { Button, showPopup } from "components/src/minor";
import { LoadingBar } from "components/src/minor/LoadingBar";
import { ModalBox } from "components/src/minor/ModalBox";
import { createStorefrontComponent, getStorefront } from "components/src/services/api";
import { updateStorefrontComponent } from "components/src/services/api/storefront";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { ComponentList } from "./ComponentList";
import ConfigComponentHeader from "./ConfigComponentHeader";
import { TagProducts } from "./TagProducts";

export const ComponentStoreWrapper: React.FC = () => {
  const { store, storeLoading } = useStoreContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products } = useProductContext();
  const {
    setBuilderLoading,
    setIsProductsVisible,
    isProductsVisible,
    productPerImageIndex,
    setProductPerImageIndex,
    isComponentUpdated,
    setIsComponentUpdated,
  } = useBuilderContext();
  const {
    newStorefrontComponent,
    setNewStorefrontComponent,
    storefrontComponents,
    setStorefrontComponents,
    isOpenComponentList,
    setIsOpenComponentList,
    setData,
    isOpenImageGridPreview,
    setIsOpenImageGridPreview,
  } = useBuilderContext();

  useEffect(() => {
    const initializeStorefrontComponents = async () => {
      if (!store.id) return;

      setBuilderLoading(true);

      try {
        // If the storefrontComponents are empty, fetching the initial components
        if (!storefrontComponents.length) {
          const response = await getStorefront(store.id);

          if (!response.data) {
            throw new Error(response.error); // Throw error to be caught in catch block
          }
          setStorefrontComponents(response.data);
        }

        // Checking if there's a new storefront component to add
        if (newStorefrontComponent) {
          const isRequiredTypeExist = storefrontComponents.some(component => component.type === newStorefrontComponent?.type);

          if (componentTypeCheck(newStorefrontComponent.type) && !isRequiredTypeExist) {
            const response = await createStorefrontComponent(store.id, {
              ...newStorefrontComponent,
              position: storefrontComponents.length,
            });
            if (
              newStorefrontComponent.data.loops.length === 0 &&
              (newStorefrontComponent.type === StorefrontComponentType.SHOPPABLE_VIDEO_FEED ||
                newStorefrontComponent.type === StorefrontComponentType.SHOPPABLE_CAROUSEL)
            ) {
              setIsModalOpen(true);
            }
            if (newStorefrontComponent.data.loops.length === 0 && newStorefrontComponent.type === StorefrontComponentType.COUPONS) {
              setIsModalOpen(true);
            }
            if (response.data) {
              const updatedStorefrontComponents = [...storefrontComponents];
              updatedStorefrontComponents.push(response.data);
              setStorefrontComponents(updatedStorefrontComponents);
              setNewStorefrontComponent(null);
              showPopup("success", "Component Created Successfully");
            } else {
              throw new Error(response.error);
            }
          }
          if (componentTypeCheck(newStorefrontComponent.type) && isRequiredTypeExist) {
            showPopup("success", "Component already exist");
            return;
          }
        }
      } finally {
        setBuilderLoading(false);
      }
    };

    initializeStorefrontComponents();
  }, [newStorefrontComponent, store.id]);

  const handleSave = async () => {
    if (!newStorefrontComponent || !store.id) {
      return;
    }

    // Validate the storefront component
    const validationError = validateStorefrontComponent(newStorefrontComponent);
    if (validationError) {
      return showPopup("error", validationError);
    }

    if (newStorefrontComponent.type === StorefrontComponentType.PRODUCT_GRID) {
      const selectedProductsIds = newStorefrontComponent.data._selectedProductsIds;
      newStorefrontComponent.data.products = newStorefrontComponent.data.products.filter(p => p.id !== undefined);
      newStorefrontComponent.data.products = newStorefrontComponent.data.products.filter(p => selectedProductsIds.includes(p.id!));
    }

    setBuilderLoading(true);

    const isAboutUsComponent =
      newStorefrontComponent.type === StorefrontComponentType.BRAND_INFO &&
      storefrontComponents.some(component => component.type === newStorefrontComponent.type);

    try {
      let response;
      if (isComponentUpdated) {
        response = await updateStorefrontComponent(store.id, newStorefrontComponent);

        if (response.data) {
          const updatedStorefrontComponent = response.data;

          // Create a new array to trigger React's re-render
          const updatedStorefrontComponents = storefrontComponents.map(component =>
            component.id === updatedStorefrontComponent.id ? updatedStorefrontComponent : component,
          );

          setStorefrontComponents(updatedStorefrontComponents);
          showPopup("success", "Component Updated Successfully");
        } else if (response.error) {
          showPopup("error", response.error);
          return;
        }
      } else {
        if (isAboutUsComponent) {
          showPopup("error", "Component already exist");
          setBuilderLoading(false);
          return;
        }
        response = await createStorefrontComponent(store.id, {
          ...newStorefrontComponent,
          position: storefrontComponents.length,
        });

        if (response.data) {
          const newStorefrontComponents = [...storefrontComponents, response.data];
          setStorefrontComponents(newStorefrontComponents);
          showPopup("success", "Component Created Successfully");
        } else if (response.error) {
          showPopup("error", response.error);
          return;
        }
      }
    } catch (error) {
      showPopup("error", `An unexpected error occurred,${error}`);
    } finally {
      // Reset state and UI
      setBuilderLoading(false);
      setNewStorefrontComponent(null);
      setIsComponentUpdated(false);
      setIsOpenComponentList(true);
      setIsOpenImageGridPreview(true);
      localStorage.clear();
    }
  };
  const handleEnterKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  const handleOnCrossClick = () => {
    setIsProductsVisible(false);
  };
  const Component = newStorefrontComponent ? builderComponentMapping.get(newStorefrontComponent.type) : null;
  return (
    <div className="flex items-center justify-center h-full pl-4">
      <ModalBox
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type2
        singleButton
        singleButtonLabel="Get Link"
        image={previewInfo}
        title="⚠️These are just the previews"
        description="Your components will only go live when loops, and coupons are added through the Seller App.
We've sent the Seller App link to your email — finish setting things up there to make your store visible!"
      />
      <div className="h-full w-full min-w-52 overflow-y-auto rounded-[10px] border border-white-light7 bg-white-light4">
        {storeLoading && <LoadingBar />}

        <div className="h-full px-2">
          {isProductsVisible ? (
            <div className="relative flex h-full flex-col">
              {/* Sticky Cross Button */}
              <div className="sticky top-0 z-50 flex w-full justify-end bg-white-light4">
                <RxCross1 onClick={handleOnCrossClick} className="cursor-pointer text-3xl font-bold text-brand-color1" />
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-auto">
                <TagProducts data={newStorefrontComponent.data} setData={setData} products={products} index={productPerImageIndex} />
              </div>

              {/* Sticky Bottom Button */}
              <div className="sticky bottom-0 flex items-center justify-center bg-white-light4 p-2">
                <Button label="Tag Products" className="mb-2 min-w-40" primary={true} size="small" handelClick={() => setIsProductsVisible(false)} />
              </div>
            </div>
          ) : Component?.configComponent && isOpenComponentList ? (
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="sticky top-0 z-50 mb-2">
                  <ConfigComponentHeader />
                </div>

                <Component.configComponent
                  storefrontComponentType={newStorefrontComponent.type}
                  isOpenImageGridPreview={isOpenImageGridPreview}
                  setIsOpenImageGridPreview={setIsOpenImageGridPreview}
                  data={newStorefrontComponent.data}
                  setData={setData}
                  onclick={() => setIsProductsVisible(true)}
                  setIndex={setProductPerImageIndex}
                />
              </div>
              <div className="sticky bottom-0 flex w-full items-center justify-center bg-gradient-to-b from-transparent via-white-light4/40 to-white-light4 p-2 backdrop-blur-sm">
                <Button onKeydown={handleEnterKey} handelClick={handleSave} label="Save" className="min-w-40" primary={true} size="small" />
              </div>
            </div>
          ) : (
            <ComponentList />
          )}
        </div>
      </div>
    </div>
  );
};

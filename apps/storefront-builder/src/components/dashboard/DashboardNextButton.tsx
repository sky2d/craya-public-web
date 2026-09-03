"use client";

import { useDashboardContext } from "@/provider/DashboardProvider";
import { useProductContext } from "@/provider/ProductProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { validateProductFields, validateProductSKUs } from "@/services/validators/products/productDetails.validator";
import { validateStoreFields } from "@/services/validators/store/storeDetails.validators";
import { validateEmail, validatePhone } from "@/utils/storeNameValidation ";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2, showPopup } from "components/src/minor";
import { createProduct, createStore, updateProduct, updateProductDetails, updateProductSKU, updateStore } from "components/src/services/api";
import { triggerProductDetailsOnboardingEmail, triggerStoreOnboardingEmail } from "components/src/services/api/emailManagement";
import { updateUserProfile } from "components/src/services/api/user";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ClientModalHandler } from "./ClientSaveModal";

export const DashboardNextButton = () => {
  const { step, setStep } = useDashboardContext();
  const {
    store,
    user,
    setUser,
    isStoreChanged,
    _setIsStoreChanged,
    setStore,
    setStoreError,
    userErrors,
    userProfileChanged,
    setUserProfileChanged,
    setStoreLoading,
    resetStoreChanges,
    setIsModalOpen,
    isModalOpen,
  } = useStoreContext();
  const {
    products,
    selectedProduct,
    setSelectedProduct,
    isSelectedProductChanged,
    isSelectedProductDetailsChanged,
    isSelectedProductSKUsChanged,
    originalProductSKUs,
    setProducts,
    setProductError,
    setSelectedProductLoading,
    setIsProductInfoChanged,
    resetSelectProductChanges,
  } = useProductContext();

  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();

  useEffect(() => {
    if (pathname.startsWith("/dashboard/store") || (pathname === "/dashboard" && store?.isOnboarding)) setStep(1);
    else if (pathname.startsWith("/dashboard/products")) setStep(2);
    else if (pathname.startsWith("/dashboard/continue-editing")) setStep(3);
    else if (pathname.startsWith("/dashboard/coupons")) setStep(4);
  }, [pathname, store?.isOnboarding]);

  const handleNextStoreButton = async () => {
    const storeError = validateStoreFields(store);
    setStoreError(storeError);
    if (user.email === null || !validateEmail(user.email)) {
      showPopup("error", "Please enter a valid email address");
      return;
    }
    const trimmedPhone: string | null = user.phone ? user.phone.replace(/^\+91/, "") : null;

    if (trimmedPhone === null || !validatePhone(trimmedPhone)) {
      showPopup("error", "Please enter a valid mobile number");
      return;
    }

    if (storeError || userErrors) {
      return;
    }
    if (userProfileChanged) {
      const updateUserResponse = await updateUserProfile(user);
      if (updateUserResponse.data) {
        setUser(updateUserResponse.data);
        setUserProfileChanged(false);
        if (!isStoreChanged) showPopup("success", "Contact details updated");
      }
      if (updateUserResponse.error) {
        setUserProfileChanged(false);
        showPopup("error", updateUserResponse.error);
      }
    }
    if (!isStoreChanged) {
      if (store.isOnboarding && products.length === 0) {
        router.push("/dashboard/products/addProduct");
        return;
      }
      if (store.isOnboarding && products.length > 0) {
        router.push("/dashboard/products");
        return;
      } else return;
    }
    setIsModalOpen(false);
    setStoreLoading(true);
    if (store.id) {
      const updateStoreResponse = await updateStore(store);
      if (updateStoreResponse.data) {
        setStore(updateStoreResponse.data);
        showPopup("success", "Store updated");
      } else {
        showPopup("error", `Unable to update the store: ${updateStoreResponse.error}`);
      }
    } else {
      const createStoreResponse = await createStore(store);

      // trigger only once when user is creating store
      await triggerStoreOnboardingEmail(user.id, "STEP_1_SUCCESS");
      if (!createStoreResponse.data) {
        showPopup("error", `Store cannot be created : ${createStoreResponse.error}`);
        setStoreLoading(false);
        return;
      }
      setStore(createStoreResponse.data);
      showPopup("success", "Store created");
    }

    if (store.isOnboarding && products.length === 0) {
      router.push("/dashboard/products/addProduct");
    }
    if (store.isOnboarding && products.length > 0) {
      router.push("/dashboard/products");
    }
    setStoreLoading(false);
    resetStoreChanges();
  };

  const handelSaveProductButton = async () => {
    if (!selectedProduct) return;

    const productError = validateProductFields(selectedProduct);
    const skusError = validateProductSKUs(selectedProduct.productSKUs);
    setProductError(productError);

    if (productError) return;
    if (skusError) {
      showPopup("error", skusError.message);
      return;
    }
    if (!isSelectedProductChanged) return;
    setIsModalOpen(false);
    setSelectedProductLoading(true);

    try {
      if (selectedProduct.id) {
        let updatedProduct = { ...selectedProduct };

        // Step 1: Update details if changed
        if (isSelectedProductDetailsChanged) {
          const res = await updateProductDetails(selectedProduct.productDetails, selectedProduct.id);
          updatedProduct.productDetails = res.data;
        }

        // Step 2: Update SKUs if changed
        if (isSelectedProductSKUsChanged) {
          const skuPayload = selectedProduct.productSKUs.filter(sku => sku.size != null);
          const res = await updateProductSKU(originalProductSKUs, skuPayload);
          updatedProduct.productSKUs = res.data;
        }

        // Step 3: Update main product
        const updateProductResponse = await updateProduct(updatedProduct);

        if (updateProductResponse.error) {
          showPopup("error", `Product cannot be updated : ${updateProductResponse.error}`);
          return;
        }

        if (updateProductResponse.data) {
          updatedProduct = {
            ...updateProductResponse.data,
            productDetails: updatedProduct.productDetails,
            productSKUs: updatedProduct.productSKUs,
          };

          setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
          setSelectedProduct({ ...selectedProduct, productSKUs: updatedProduct.productSKUs, productDetails: updatedProduct.productDetails });
          showPopup("success", "Product updated successfully");
        }
      } else {
        const createProductResponse = await createProduct(selectedProduct);

        if (store.isOnboarding && products.length === 1) {
          await triggerProductDetailsOnboardingEmail(user.id, "STEP_2_SUCCESS");
        }

        if (createProductResponse.data) {
          setProducts([...products, createProductResponse.data]);
        } else {
          showPopup("error", `Unable to create product : ${createProductResponse.error}`);
          return;
        }
      }
    } catch (err) {
      console.error("Error while updating product:", err);
      showPopup("error", "Something went wrong while updating product");
    } finally {
      // ✅ this always runs, even on error or return
      setSelectedProductLoading(false);
      resetSelectProductChanges();
      router.replace("/dashboard/products");
      router.refresh();
    }
  };

  const getButtonLabel = () => {
    if (!store.isOnboarding) return "Save";
    if (step === 1) return "Next";
    if (step === 2 && products.length) return "Next";
    if (step === 2 && !products.length) return "Create";
    return "Next";
  };
  const handleNextClick = async () => {
    if (step === 1) {
      await handleNextStoreButton();
    }

    if (step === 2) {
      if (!products.length && pathname === "/dashboard/products") {
        return null;
      }
    }

    if (step === 2 && products.length && pathname === "/dashboard/products") {
      router.push("/dashboard/continue-editing");
    }
    if (step === 2 && id) {
      await handelSaveProductButton();
    }
  };

  const shouldHideNextButton =
    step === 3 ||
    (step === 2 && !products.length && pathname === "/dashboard/products") ||
    (step === 2 && !store.isOnboarding && pathname === "/dashboard/products") ||
    pathname === "/dashboard/link" ||
    (pathname === "/dashboard" && !store?.isOnboarding);

  return (
    <div className="flex w-full justify-center">
      <ClientModalHandler
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleButtonClick={handleNextClick}
        setStoreOrProductChange={step === 1 ? _setIsStoreChanged : setIsProductInfoChanged}
      />
      {!shouldHideNextButton && (
        <Button2
          label={getButtonLabel()}
          buttonSize="lg"
          className="border bg-brand-color1 !px-9 text-white-light4"
          type={ButtonType.PRIMARY}
          handleClick={handleNextClick}
        />
      )}
    </div>
  );
};

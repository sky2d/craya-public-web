"use client";

import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import HeaderActionsBar from "@/components/generic/HeaderActionsBar";
import { Label } from "@/components/homeScreen/sellers/components/Label";
import { useStoreContext } from "@/provider/StoreProvider";
import { useUserContext } from "@/provider/UserProvider";
import { validateEmail, validatePhone } from "@/utils/storeNameValidation ";
import { loginMethod, UploadedFile } from "components/src/interfaces";
import { InputFieldType } from "components/src/interfaces/InputField";
import { InputField2 } from "components/src/minor";
import { LoadingBar } from "components/src/minor/LoadingBar";
import { checkUserExist, StoreExist } from "components/src/services/api";
import { useEffect, useState } from "react";
import StoreColorPickerSection from "./StoreColorPickerSection";
import StoreLocationDropdownSection from "./StoreLocationDropdownSection ";
import StoreLogoSection from "./StoreLogoSection";
import StoreTagsSection from "./StoreTagsSection ";

const MAX_MESSAGE_LENGTH = 160;

const StoreDetails = () => {
  const { store, user: storeUser, setUser: setStoreUser, storeError, setStoreError, storeLoading, setStore } = useStoreContext();
  const [existingStoreName, setExistingStoreName] = useState(store.name);
  const [seoTags, setSeoTags] = useState<string>("");
  const { user, userErrors, setUserErrors, setUser } = useUserContext();

  useEffect(() => {
    if (user && user.id && (!storeUser || !storeUser.id)) {
      setStoreUser(user, false);
    }
  }, [user, storeUser, setStoreUser]);

  const updateStoreLogo = (image: UploadedFile) => {
    setStore({ ...store, logo: image, logoId: image.id });
  };

  useEffect(() => {
    if (!store.name) {
      setStoreError(null);
      return;
    }

    if (!existingStoreName) {
      setExistingStoreName(store.name);
      return;
    }

    // If unchanged from original, clear error and skip
    if (existingStoreName === store.name) {
      setStoreError(null);
      return;
    }

    // Debounce API check for new name
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await StoreExist(store.name);
        if (response.data?.exists) {
          setStoreError({ ...storeError, name: "Store name already exist" });
        } else {
          setStoreError(null);
        }
      } catch (err) {
        console.error("Error checking store name:", err);
      }
    }, 1000);

    // Cleanup on change
    return () => clearTimeout(delayDebounceFn);
  }, [store.name, existingStoreName]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const fetUserStatus = async () => {
        if (!user.email || !user.phone) return;
        if (user.email === user.email && user.phone === user.phone) {
          setUserErrors(null);
          return;
        }
        const response = await checkUserExist(
          user.loginMethod === loginMethod.GOOGLE ? undefined : user.email,
          user.loginMethod === loginMethod.PHONE ? undefined : user.phone,
        );
        if (response.data) {
          if (response.data.exists) {
            if (user.loginMethod === loginMethod.GOOGLE) {
              setUserErrors({ ...userErrors, phone: "Phone number already exists" });
            } else {
              setUserErrors({ ...userErrors, email: "Email already exists" });
            }
          } else {
            setUserErrors(null);
          }
        }
      };
      fetUserStatus();
    }, 1000); // 1 seconds debounce
    return () => {
      clearTimeout(handler);
    };
  }, [user.email, user.phone]);

  const handleContactDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    const updatedUser = {
      ...user,
      phone: user.loginMethod === loginMethod.GOOGLE ? value : user.phone,
      email: user.loginMethod === loginMethod.GOOGLE ? user.email : value,
    };

    setStoreUser(updatedUser, true);
    setUser(updatedUser);

    // Validation and setting error
    if (user.loginMethod === loginMethod.GOOGLE) {
      if (!validatePhone(value)) {
        setUserErrors({ ...userErrors, phone: "Invalid phone number" });
      } else {
        setUserErrors(null);
      }
    } else {
      if (!validateEmail(value)) {
        setUserErrors({ ...userErrors, email: "Invalid email address" });
      } else {
        setUserErrors(null);
      }
    }
  };

  return (
    <>
      {storeLoading || !store ? (
        <LoadingBar />
      ) : (
        <div className="p-1">
          <HeaderActionsBar text="Store Details" />
          <div className="flex w-full px-2">
            <div className="flex w-[45%] flex-col items-center p-1">
              <StoreLogoSection logo={store?.logo} onLogoChange={updateStoreLogo} />
            </div>
            <div
              className={`flex w-[55%] flex-col items-center p-1 pb-3 transition-all duration-300 ${!store.logo ? "pointer-events-none opacity-50" : ""}`}
            >
              <WhiteBackgroundWrapper className="mb-2 w-full text-start text-xl font-medium">Basic Details :</WhiteBackgroundWrapper>

              <WhiteBackgroundWrapper className="flex w-full flex-col items-center text-start text-xl font-medium">
                <div className="flex w-full justify-start">
                  <div className="w-full p-1">
                    <Label>Store Name</Label>
                    <InputField2
                      dataIndex={0}
                      type={InputFieldType.TEXT}
                      placeholder="Store Name"
                      onChange={e => setStore({ ...store, name: e.target.value })}
                      value={store.name}
                      errorMessage={storeError?.name}
                    />
                  </div>

                  <div className="w-full p-1">
                    <Label>{user.loginMethod === loginMethod.GOOGLE ? "Mobile Number" : "Email"}</Label>
                    <InputField2
                      dataIndex={1}
                      type={InputFieldType.TEXT}
                      placeholder={user.loginMethod === loginMethod.GOOGLE ? "Mobile Number" : "Email"}
                      onChange={handleContactDetailsChange}
                      value={user.loginMethod === loginMethod.GOOGLE ? (user.phone ?? "") : (user.email ?? "")}
                      errorMessage={user.loginMethod === loginMethod.GOOGLE ? userErrors?.phone : userErrors?.email}
                    />
                  </div>
                </div>

                <StoreLocationDropdownSection store={store} errorMessage={storeError?.address} setStore={setStore} />

                <StoreColorPickerSection storeError={storeError?.primaryColor} setStore={setStore} store={store} />

                <StoreTagsSection
                  seoTags={seoTags}
                  setSeoTags={setSeoTags}
                  storeTags={store.storeTags || []}
                  setStoreTags={tags => setStore({ ...store, storeTags: tags })}
                  error={storeError?.storeTags}
                />

                <div className="w-full p-1">
                  <Label>Tell us about your store</Label>
                  <InputField2
                    rows={3}
                    resizable
                    placeholder="Describe your store..."
                    value={store.description || ""}
                    onChange={e => {
                      if (e.target.value.length > MAX_MESSAGE_LENGTH) {
                        return;
                      }
                      setStore({
                        ...store,
                        description: e.target.value.slice(0, MAX_MESSAGE_LENGTH),
                      });
                    }}
                  />
                  <p
                    className={`mt-1 text-right text-xs ${store?.description.length >= MAX_MESSAGE_LENGTH - 10 ? "text-red-500" : "text-[#CDCDCD]"}`}
                  >
                    {store?.description?.length || 0}/{MAX_MESSAGE_LENGTH} characters
                  </p>
                </div>
              </WhiteBackgroundWrapper>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoreDetails;

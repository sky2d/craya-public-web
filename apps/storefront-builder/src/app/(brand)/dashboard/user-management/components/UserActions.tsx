"use client";

import { useLoadingContext } from "@/provider/LoadingProvider";
import { usePolicyContext } from "@/provider/PolicyProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { useUserContext } from "@/provider/UserProvider";
import { validateAddressFields } from "@/services/validators/address.validator";
import { validateBankFields } from "@/services/validators/bankDetails.validator";
import { validateStoreSocailsFields } from "@/services/validators/store/storeSocials.validator";
import { validateUserProfileFields } from "@/services/validators/user/user.validator";
import { Policies } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2, showPopup } from "components/src/minor";
import { createPickupAddress, createPolicy, updatePickupAddress, updatePolicy, updateStore } from "components/src/services/api";
import { updateBankDetailsUser, updateUserProfile } from "components/src/services/api/user";
import { formatToISODate } from "components/src/utils/date";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type HeaderActionsBarProps = {
  text: string;
  showCancelButton?: boolean;
  onCancelClick?: () => void;
};

const stepMap: Record<string, number> = {
  "/dashboard/user-management/help": 5,
  "/dashboard/user-management/policies": 4,
  "/dashboard/user-management/delivery": 3,
  "/dashboard/user-management/payment": 2,
  "/dashboard/user-management": 1,
};

const UserActions: React.FC<HeaderActionsBarProps> = ({ text, showCancelButton = false, onCancelClick }) => {
  const [step, setStep] = useState<number>(1);
  const pathname = usePathname();

  const { store, storePickupAddress, storeSocials, setStore, setStoreSocialError, setStorePickupAddress, setStorePickupError } = useStoreContext();
  const { user, bankDetails, setUser, setUserErrors, setBankErrors } = useUserContext();
  const { selectedPolicy, setSelectedPolicy } = usePolicyContext();
  const { loading, setLoading } = useLoadingContext();

  useEffect(() => {
    const matchedStep = Object.entries(stepMap).find(([path]) => pathname.includes(path))?.[1];
    if (matchedStep) setStep(matchedStep);
  }, [pathname]);

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      if (step === 1) {
        const userErrors = validateUserProfileFields(user);
        setUserErrors(userErrors);

        const socialsErrors = validateStoreSocailsFields(storeSocials);
        setStoreSocialError(socialsErrors);

        if (userErrors || socialsErrors) return;
        const updatedUser = { ...user };

        if (updatedUser.dob) {
          updatedUser.dob = formatToISODate(updatedUser.dob);
        }

        const [userRes, storeRes] = await Promise.all([updateUserProfile(updatedUser), updateStore({ ...store, socials: storeSocials })]);

        if (!userRes.data || userRes.error || !storeRes.data || storeRes.error) {
          showPopup("error", "Failed to update user and store details");
          return;
        }

        setUser(userRes.data);
        setStore(storeRes.data);
      } else if (step === 2) {
        if (!bankDetails) {
          showPopup("error", "No bank details to update. Please fill in the bank details.");
          return;
        }

        const bankErrors = validateBankFields(bankDetails);
        if (setBankErrors) setBankErrors(bankErrors);
        if (bankErrors) return;

        const { data, error } = await updateBankDetailsUser(bankDetails);
        if (!data || error) {
          showPopup("error", "Failed to update bank details. Please try again.");
          return;
        }
      } else if (step === 3) {
        const addressErrors = validateAddressFields(storePickupAddress);
        setStorePickupError(addressErrors);
        if (addressErrors || !store?.id) return;

        if (storePickupAddress.id) {
          const { data, error } = await updatePickupAddress(store.id, storePickupAddress.id, storePickupAddress);
          if (!data || error) {
            showPopup("error", "Failed to update pickup address. Please try again.");
            return;
          }
          setStorePickupAddress(data[0]);
          showPopup("success", "Address updated successfully");
        } else {
          const { data, error } = await createPickupAddress(store.id, storePickupAddress);
          if (!data || error) {
            showPopup("error", "Failed to create pickup address. Please try again.");
            return;
          }
          setStorePickupAddress(data[0]);
          showPopup("success", "Address created successfully");
        }
      } else if (step === 4) {
        if (!selectedPolicy) return;

        let policyData: Policies | undefined;
        if (selectedPolicy.id) {
          const { data, error } = await updatePolicy(selectedPolicy);
          if (!data || error) {
            showPopup("error", "Failed to update policy.");
            return;
          }
          policyData = data;
        } else {
          const { data, error } = await createPolicy(selectedPolicy);
          if (!data || error) {
            showPopup("error", "Failed to save policy.");
            return;
          }
          policyData = data;
        }
        setSelectedPolicy(policyData);
      } else if (step === 5) {
        // Step 5 logic if any
      }
    } catch (err) {
      console.error(err);
      showPopup("error", "An unexpected error occurred");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full items-center justify-between px-2 py-2">
        <h4 className="text-[clamp(24px,1.7vw,30px)] font-semibold">{text}</h4>

        <div className="flex h-full items-center justify-center gap-1">
          {showCancelButton && (
            <Button2
              type={ButtonType.DEFAULT}
              buttonSize="lg"
              label="Cancel"
              className="!w-1/2 !border-[1px] !border-[#6e6c6c] !text-[#6e6c6c]"
              handleClick={onCancelClick}
              disabled={loading}
            />
          )}
          <Button2
            type={ButtonType.PRIMARY}
            buttonSize="lg"
            label="Save"
            className="!w-1/2 !border-[1px]"
            handleClick={handleSaveClick}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default UserActions;

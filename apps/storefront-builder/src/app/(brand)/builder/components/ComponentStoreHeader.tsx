"use client";

import { useBuilderContext } from "@/provider/BuilderProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2, showPopup } from "components/src/minor";
import { updateComponentPositions, updateStore } from "components/src/services/api";
import { triggerBuilderOnboardingEmail } from "components/src/services/api/emailManagement";
import { useRouter } from "next/navigation";

export const ComponentStoreHeader = () => {
  const router = useRouter();
  const { storefrontComponents } = useBuilderContext();
  const { store, setStore } = useStoreContext();
  const storefrontComponentLength = storefrontComponents.length;

  const handleNextButton = async () => {
    if (store.isOnboarding) {
      await triggerBuilderOnboardingEmail(store.user!.id!, "STEP_3_SUCCESS");
      const updatedResponse = await updateStore({ ...store, isOnboarding: false });
      if (updatedResponse.data) {
        setStore(updatedResponse.data);
      }
    }
    const storefrontComponentIDS = storefrontComponents.map(storefrontComponent => storefrontComponent.id!);
    const response = await updateComponentPositions(storefrontComponentIDS, store.id!);
    if (response.error) {
      showPopup("error", response.error);
      return;
    }
    router.push("/dashboard/link");
  };

  return (
    <div className="my-3 mr-4 w-full">
      <Button2
        handleClick={handleNextButton}
        label={storefrontComponentLength > 0 ? "Publish" : "Add Elements On your Store Front"}
        type={ButtonType.PRIMARY}
        buttonSize="lg"
        disabled={storefrontComponentLength === 0}
      />
    </div>
  );
};

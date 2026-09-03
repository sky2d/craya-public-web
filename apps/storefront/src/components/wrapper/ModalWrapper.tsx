"use client";

import ExitIntentLogin from "@/assets/icons/ExitIntentLogin.svg";
import LoginInSignUp from "@/assets/icons/LoginSignUp.svg";
import { useCartContext } from "@/provider/CartProvider";
import { useModalContext } from "@/provider/ModalProvider";
import { useUserContext } from "@/provider/UserProvider";
import { handleProductPress } from "@/services/storeActions";
import { getRecentAndTrackableOrders } from "@/utils/delivery";
import { checkIfUserReviewedProduct } from "@/utils/review";
import { ProductStatusEnum, StorefrontActions, StorefrontComponentData } from "components/src/interfaces";
import { ModalKey } from "components/src/interfaces/modal";
import { Order } from "components/src/interfaces/orders";
import { getOrders } from "components/src/services/api/orders";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const LoginInSignUpModel = dynamic(() => import("../model/LoginSignupModel").then(mod => mod.LoginInSignUpModel), { ssr: false });
const CartReminderModel = dynamic(() => import("../model/CartReminderModel").then(mod => mod.CartReminderModel), { ssr: false });
const RecentOrderModal = dynamic(() => import("../model/RecentOrderModal").then(mod => mod.RecentOrderModal), { ssr: false });
const TrackOrderModal = dynamic(() => import("../model/TrackOrderModal").then(mod => mod.TrackOrderModal), { ssr: false });
const ExitIntentModal = dynamic(() => import("../model/ExitIntentModal").then(mod => mod.ExitIntentModal), { ssr: false });

export const ModalWrapper = () => {
  const router = useRouter();
  const { activeModal, openHighestPriorityModal, closeModal } = useModalContext();
  const { cart } = useCartContext();
  const { user } = useUserContext();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [trackableOrders, setTrackableOrders] = useState<Order[]>([]);
  const session = useSessionContext();

  const filteredCartItems = useMemo(() => {
    if (!cart?.cartItems) return [];
    return cart.cartItems.filter(item => !item.product.isOutOfStock && item.product.status !== ProductStatusEnum.DISABLED).slice(0, 3);
  }, [cart?.cartItems]);

  const handleComponentAction = (action: StorefrontActions, data: StorefrontComponentData) => {
    if (action === StorefrontActions.PRODUCT_PRESS) {
      handleProductPress(router, `/products/details/${data.products[0].id}`);
    }
  };

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !activeModal) {
        const sessionExists = !session.loading && session.doesSessionExist;
        openHighestPriorityModal(sessionExists ? ["exitIntent"] : ["exitIntentLogin"]);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [activeModal, session, openHighestPriorityModal]);

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout | null = null;
    let logInterval: NodeJS.Timeout | null = null;

    const resetInactivityTimer = () => {
      // Clear previous timers
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = null;
      }

      if (logInterval) {
        clearInterval(logInterval);
        logInterval = null;
      }

      inactivityTimeout = setTimeout(
        () => {
          clearInterval(logInterval!);
          if (!activeModal && filteredCartItems.length > 0) {
            openHighestPriorityModal(["cart"]);
          }
        },
        10 * 1000 * 60,
      );
    };

    const activityEvents = ["mousemove", "keydown", "scroll", "touchstart"];

    activityEvents.forEach(event => window.addEventListener(event, resetInactivityTimer));

    // Initialize timer on mount
    resetInactivityTimer();

    return () => {
      if (inactivityTimeout) clearTimeout(inactivityTimeout);
      if (logInterval) clearInterval(logInterval);
      activityEvents.forEach(event => window.removeEventListener(event, resetInactivityTimer));
    };
  }, [activeModal, filteredCartItems, openHighestPriorityModal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!activeModal && trackableOrders && trackableOrders.length > 0) {
        openHighestPriorityModal(["trackOrder"]);
      }
    }, 10 * 1000);

    return () => clearTimeout(timer);
  }, [activeModal, openHighestPriorityModal, trackableOrders]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const { data, error: orderError } = await getOrders({ page: 1, limit: 3 });
      if (!data?.orders.length || orderError || !user?.id) return;

      const { recentOrders, trackableOrders } = await getRecentAndTrackableOrders(data.orders, user.id, checkIfUserReviewedProduct);

      setRecentOrders(recentOrders);
      setTrackableOrders(trackableOrders);
    };

    if (user?.id) fetchOrderData();
  }, [user?.id]);

  useEffect(() => {
    const eligibleModals: ModalKey[] = [];

    if (activeModal) return;

    if (recentOrders && recentOrders.length > 0) {
      eligibleModals.push("recentOrder");
    }
    if (trackableOrders && trackableOrders.length > 0) {
      eligibleModals.push("trackOrder");
    }
    if (eligibleModals.length > 0) {
      openHighestPriorityModal(eligibleModals);
    }
  }, [filteredCartItems, recentOrders, trackableOrders, activeModal, openHighestPriorityModal]);

  if (!activeModal) return null;

  return (
    <>
      {activeModal === "login" && <LoginInSignUpModel loginImage={LoginInSignUp} isOpen={true} onClose={closeModal} />}
      {activeModal === "cart" && (
        <CartReminderModel isOpen={true} onClose={closeModal} cartItems={filteredCartItems} handlerFunction={handleComponentAction} />
      )}
      {activeModal === "recentOrder" && recentOrders && recentOrders?.length > 0 && (
        <RecentOrderModal isOpen={true} onClose={closeModal} orders={recentOrders} handlerFunction={handleComponentAction} />
      )}
      {activeModal === "trackOrder" && trackableOrders && trackableOrders?.length > 0 && (
        <TrackOrderModal isOpen={true} onClose={closeModal} orders={trackableOrders} handlerFunction={handleComponentAction} />
      )}
      {activeModal === "exitIntent" && <ExitIntentModal isOpen={true} onClose={closeModal} />}
      {activeModal === "exitIntentLogin" && <LoginInSignUpModel loginImage={ExitIntentLogin} isOpen={true} onClose={closeModal} />}
    </>
  );
};

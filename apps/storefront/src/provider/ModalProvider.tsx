"use client";

import { ModalKey } from "components/src/interfaces/modal";
import { createContext, ReactNode, useContext, useState } from "react";

const MODAL_VIEW_LIMITS: Record<ModalKey, number | null> = {
  login: null, // null = unlimited views
  cart: 3,
  offer: 3,
  recentOrder: 3,
  trackOrder: 3,
  exitIntent: null,
  exitIntentLogin: null,
};

const MODAL_PRIORITY: Record<ModalKey, number> = {
  cart: 2,
  offer: 3,
  login: 5,
  recentOrder: 1,
  trackOrder: 4,
  exitIntent: 6,
  exitIntentLogin: 6,
};

const getModalViewCount = (modal: ModalKey): number => {
  const stored = localStorage.getItem("modalViews");
  const parsed = stored ? JSON.parse(stored) : {};
  return parsed[modal] || 0;
};

const wasModalShownThisSession = (modal: ModalKey): boolean => {
  const shown = sessionStorage.getItem("modalsShownThisSession");
  const parsed = shown ? JSON.parse(shown) : {};
  return parsed[modal] === true;
};

const markModalShownThisSession = (modal: ModalKey) => {
  const shown = sessionStorage.getItem("modalsShownThisSession");
  const parsed = shown ? JSON.parse(shown) : {};
  parsed[modal] = true;
  sessionStorage.setItem("modalsShownThisSession", JSON.stringify(parsed));
};

const canShowModal = (modal: ModalKey, manual = false): boolean => {
  const limit = MODAL_VIEW_LIMITS[modal];
  const wasShownThisSession = JSON.parse(sessionStorage.getItem("modalsShownThisSession") || "{}")[modal];

  if (manual) return true; // allow manual opens

  if (wasShownThisSession) return false; // already shown this session

  if (limit === null) return true; // unlimited views

  const viewCount = getModalViewCount(modal);
  return viewCount < limit;
};

interface ModalContextType {
  activeModal: ModalKey | null;
  openModal: (modal: ModalKey) => void;
  closeModal: () => void;
  openHighestPriorityModal: (modals: ModalKey[]) => void;
}

const ModalContext = createContext({});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);
  const [closedModals, setClosedModals] = useState<Set<ModalKey>>(new Set());

  const openModal = (modal: ModalKey, manual = false) => {
    if (!canShowModal(modal, manual)) return;
    setActiveModal(modal);
    if (!manual) {
      if (!activeModal || MODAL_PRIORITY[modal] < MODAL_PRIORITY[activeModal]) {
        setActiveModal(modal);
      }
    }
  };

  const openHighestPriorityModal = (modals: ModalKey[]) => {
    const eligibleModals = modals
      .filter(modal => canShowModal(modal) && !closedModals.has(modal) && !wasModalShownThisSession(modal))
      .sort((a, b) => MODAL_PRIORITY[a] - MODAL_PRIORITY[b]);

    // checking first if modal can be shown if yes then filter out on the basis of priority

    if (eligibleModals.length === 0) return;
    const modal = eligibleModals[0];
    openModal(modal);
    markModalShownThisSession(modal);
  };

  const closeModal = () => {
    if (activeModal) {
      setClosedModals(prev => new Set(prev).add(activeModal));
    }
    setActiveModal(null);
  };

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openModal,
        closeModal,
        openHighestPriorityModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext) as ModalContextType;

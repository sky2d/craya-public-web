// context/LoopsContext.tsx
"use client";
import { Loop, LoopStatus, Presence, UploadedFileStatus } from "components/src/interfaces";
import { showPopup } from "components/src/minor";
import { getLoops } from "components/src/services/api";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useStoreContext } from "./StoreProvider";

interface LoopsContextType {
  loops: Loop[];
  setLoops: (loops: Loop[]) => void;
  selectedLoop: Loop;
  setSelectedLoop: (loop: Loop, isLoopChanged?: boolean) => void;
  isLoopChanged: boolean;
  setIsLoopChanged: (isCouponChanged: boolean) => void;
  couponLoading: boolean;
  setCouponLoading: (isLoading: boolean) => void;
}

export const INITIAL_LOOP_DATA: Loop = {
  presence: Presence.FEED,
  status: LoopStatus.ACTIVE,
  video: {
    id: "",
    fileName: "",
    fileUrl: "",
    contentType: "",
    status: UploadedFileStatus.PENDING,
    userId: "",
  },
  products: [],
};

const LoopsContext = createContext<LoopsContextType | undefined>(undefined);

export const LoopsProvider = ({ children }: { children: ReactNode }) => {
  const { store } = useStoreContext();
  const [loops, setLoops] = useState<Loop[]>([]);
  const [selectedLoop, _setSelectedLoop] = useState<Loop>(INITIAL_LOOP_DATA);
  const [isLoopChanged, setIsLoopChanged] = useState<boolean>(false);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLoops = async () => {
      if (!store.id) return;
      try {
        setCouponLoading(true);
        const { data, error } = await getLoops(store.id);
        if (error) showPopup("error", error);
        setLoops(data || []);
      } catch (err) {
        console.log("Error fetching loops:", err);
      } finally {
        setCouponLoading(false);
      }
    };

    fetchLoops();
  }, []);

  const setSelectedLoop = (loop: Loop, isLoopChanged = true) => {
    _setSelectedLoop(loop);
    setIsLoopChanged(isLoopChanged);
  };

  return (
    <LoopsContext.Provider
      value={{ selectedLoop, setSelectedLoop, loops, setLoops, isLoopChanged, setIsLoopChanged, couponLoading, setCouponLoading }}
    >
      {children}
    </LoopsContext.Provider>
  );
};

export const useLoopsContext = (): LoopsContextType => {
  const context = useContext(LoopsContext);
  if (!context) {
    throw new Error("useLoops must be used within a LoopsProvider");
  }
  return context;
};

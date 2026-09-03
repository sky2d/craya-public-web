"use client";
import { Address, AddressError, CompletionResult, Store, StoreError, UserError, UserProfile } from "components/src/interfaces";
import { SocialContacts, StoreLink, StoreSocialError } from "components/src/interfaces/store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface StoreContextType {
  storeLoading: boolean;
  setStoreLoading: (loading: boolean) => void;

  store: Store;
  setStore: (store: Store, changed?: boolean) => void;

  storeLogo: File | null;
  setStoreLogo: (storeLogo: File | null) => void;

  user: UserProfile;
  userErrors: UserError | null;

  userProfileChanged: boolean;
  setUserProfileChanged: (changed: boolean) => void;

  setUserErrors: (userErrors: UserError | null) => void;
  setUser: (user: UserProfile, isUserProfileChanged?: boolean) => void;

  storeError: StoreError | null;
  setStoreError: (storeError: StoreError | null) => void;

  storeLink: StoreLink;
  setStoreLink: (storeLink: StoreLink) => void;

  isStoreChanged: boolean;
  _setIsStoreChanged: (isStoreChanged: boolean) => void;
  resetStoreChanges: () => void;

  StoreStatus: CompletionResult;
  setStoreStatus: (status: CompletionResult) => void;

  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;

  storePickupAddress: Address;
  setStorePickupAddress: (address: Address) => void;

  storePickupError: AddressError | null;
  setStorePickupError: (error: AddressError | null) => void;

  storeSocials: SocialContacts;
  setStoreSocials: (socials: SocialContacts) => void;

  storeSocialError: StoreSocialError | null;
  setStoreSocialError: (error: StoreSocialError | null) => void;
}

const StoreContext = createContext({});

import { fetchStores } from "components/src/services/api";

interface StoreProviderProps {
  children: ReactNode;
  initialStoreData?: Store;
}

export const INITIAL_STORE_DATA: Store = {
  name: "",
  address: "",
  description: "",
  primaryColor: "",
  isOnboarding: true,
  storeTags: [],
};

const initialCompletionResult: CompletionResult = {
  percentage: 0,
  details: {
    completed: [],
    missing: [],
    user: {
      completed: [],
      missing: [],
      percentage: 0,
    },
    store: {
      completed: [],
      missing: [],
      percentage: 0,
    },
  },
};

export const initialUserProfile: UserProfile = {
  id: "",
  email: null,
  isLoggedIn: false,
  loginMethod: null,
  name: null,
  sellerName: null,
  phone: null,
  dob: null,
  gender: null,
  image: null,
};

export const initialAddress: Address = {
  id: "",
  customerName: "",
  flatNumber: "",
  area: "",
  town: "",
  state: "",
  pinCode: "",
  phoneNumber: "",
  landMark: "",
  isSelected: true,
};

export const initialSocialContacts: SocialContacts = {
  facebook: "",
  instagram: "",
  whatsapp: "",
};

export const StoreProvider = ({ children, initialStoreData }: StoreProviderProps) => {
  const [storeLoading, setStoreLoading] = useState<boolean>(false);
  const [store, _setStore] = useState<Store>(initialStoreData || INITIAL_STORE_DATA);
  const [storeLogo, _setStoreLogo] = useState<File | null>(null);
  const [user, _setUser] = useState<UserProfile>(initialUserProfile);
  const [userErrors, setUserErrors] = useState<UserError | null>(null);
  const [userProfileChanged, setUserProfileChanged] = useState<boolean>(false);
  const [storeLink, setStoreLink] = useState<StoreLink>({ url: "" });
  const [isStoreChanged, _setIsStoreChanged] = useState<boolean>(false);
  const [storeError, setStoreError] = useState<StoreError | null>(null);
  const [StoreStatus, setStoreStatus] = useState<CompletionResult>(initialCompletionResult);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [storePickupAddress, setStorePickupAddress] = useState<Address>(store.addresses?.[0] || initialAddress);
  const [storePickupError, setStorePickupError] = useState<AddressError | null>(null);
  const [storeSocials, setStoreSocials] = useState<SocialContacts>(
    store.socials ? { ...initialSocialContacts, ...store.socials } : initialSocialContacts,
  );
  const [storeSocialError, setStoreSocialError] = useState<StoreSocialError | null>(null);

  const setUser = (user: UserProfile, isUserProfileChanged = false) => {
    _setUser(user);
    setUserProfileChanged(isUserProfileChanged);
  };

  const setStore = (store: Store, changed = true) => {
    _setStore(store);
    _setIsStoreChanged(changed);
  };

  const setStoreLogo = (storeLogo: File | null) => {
    _setStoreLogo(storeLogo);
    _setIsStoreChanged(true);
  };

  const resetStoreChanges = () => {
    _setStoreLogo(null);
    _setIsStoreChanged(false);
  };

  useEffect(() => {
    const initStore = async () => {
      let currentStoreId = initialStoreData?.id;

      if (!initialStoreData) {
        setStoreLoading(true);
        const { data, error } = await fetchStores();
        if (data && data.length > 0) {
          setStore(data[0]);
          currentStoreId = data[0].id;
        } else if (error) {
          console.error("Failed to fetch stores:", error);
        }
        setStoreLoading(false);
      }

      if (!currentStoreId) return;

      // Get existing storeId from cookies
      const cookieString = document.cookie.split("; ").find(row => row.startsWith("storeId="));
      const existingStoreId = cookieString ? cookieString.split("=")[1] : null;

      if (existingStoreId !== currentStoreId) {
        document.cookie = `storeId=${currentStoreId}; path=/; SameSite=Lax`;
      }
    };
    
    initStore();
  }, [initialStoreData]);

  const value: StoreContextType = {
    storeLoading,
    setStoreLoading,
    store,
    setStore,
    storeLink,
    setStoreLink,
    storeLogo,
    user,
    setUser,
    userProfileChanged,
    setUserProfileChanged,
    userErrors,
    setUserErrors,
    setStoreLogo,
    storeError,
    setStoreError,
    isStoreChanged,
    _setIsStoreChanged,
    resetStoreChanges,
    isModalOpen,
    setIsModalOpen,
    StoreStatus,
    setStoreStatus,
    storePickupAddress,
    setStorePickupAddress,
    storePickupError,
    setStorePickupError,
    storeSocials,
    setStoreSocials,
    storeSocialError,
    setStoreSocialError,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStoreContext = () => useContext(StoreContext) as StoreContextType;

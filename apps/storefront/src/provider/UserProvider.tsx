"use client";
import { Address, AddressError, User, UserError, Wishlist } from "components/src/interfaces";
import { getWishlists } from "components/src/services/api";
import { getUser } from "components/src/services/api/user";
import { formatISOToNormalDate } from "components/src/utils/date";
import { getEnvironmentInfo } from "components/src/utils/domain";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface UserContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;

  user: User | undefined;
  setUser: (user: User) => void;

  userErrors: UserError | undefined;
  setUserErrors: (userErrors: UserError | undefined) => void;

  addressErrors: AddressError | undefined;
  setAddressErrors: (addressErrors: AddressError | undefined) => void;

  selectedAddress: Address | undefined;

  addresses: Address[] | [];
  updateUserAddress: (updatedAddress: Address) => void;
  addAddress: (newAddress: Address) => void;
  deleteUserAddress: (addressId: string) => void;

  wishlist: Wishlist | undefined;
  setWishlist: (wishlists: Wishlist) => void;

  isGlobal: boolean;

  handleSetSelectedAddress: (addr: Address) => void;
}

const UserContext = createContext({});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const session = useSessionContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [userErrors, setUserErrors] = useState<UserError>();
  const [addressErrors, setAddressErrors] = useState<AddressError>();
  const [addresses, setAddresses] = useState<Address[] | []>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [wishlist, setWishlist] = useState<Wishlist>();
  const [isGlobal, setIsGlobal] = useState<boolean>(false);

  const handleSetSelectedAddress = (addr: Address) => {
    setSelectedAddress(addr);
  };

  const updateUserAddress = (updatedAddress: Address) => {
    setAddresses(prevAddresses => {
      let updatedList = prevAddresses.map(addr => (addr.id === updatedAddress.id ? updatedAddress : addr));
      if (updatedAddress.isSelected) {
        updatedList = updatedList.map(addr => (addr.id === updatedAddress.id ? { ...addr, isSelected: true } : { ...addr, isSelected: false }));
      }

      return updatedList;
    });
  };

  const addAddress = (newAddress: Address) => {
    setAddresses(prevAddresses => {
      const updatedPrevAddresses = newAddress.isSelected ? prevAddresses.map(addr => ({ ...addr, isSelected: false })) : prevAddresses;
      return [...updatedPrevAddresses, newAddress];
    });
  };

  const deleteUserAddress = (addressId: string) => {
    const wasSelectedAddressDeleted = selectedAddress?.id === addressId;
    const remainingAddresses = addresses.filter(address => address.id !== addressId);
    setAddresses(remainingAddresses);
    if (wasSelectedAddressDeleted) {
      setSelectedAddress(remainingAddresses.length > 0 ? remainingAddresses[0] : undefined);
    }
  };

  useEffect(() => {
    const processUserData = async (userData: User) => {
      const userToUpdate = { ...userData };
      if (userToUpdate.dob) {
        userToUpdate.dob = formatISOToNormalDate(userToUpdate.dob);
      }
      const addrList = userToUpdate.addresses ?? [];
      if (addrList.length > 0) {
        const selectedAddress = addrList.find(addr => addr.isSelected) || addrList[0];
        handleSetSelectedAddress(selectedAddress);
        setAddresses(addrList);
      }
      setUser(userToUpdate);
    };

    const fetchData = async () => {
      if (session.loading || !session.doesSessionExist || user) {
        return;
      }

      setLoading(true);
      try {
        const [userRes, wishlistRes] = await Promise.all([getUser(), getWishlists()]);

        const { data: userData } = userRes;
        if (userData) await processUserData(userData);

        const { data: wishlistData } = wishlistRes;
        if (wishlistData) setWishlist(wishlistData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session.loading, !session.loading && session.doesSessionExist]);

  useEffect(() => {
    try {
      const { subdomain } = getEnvironmentInfo();
      setIsGlobal(!subdomain);
    } catch (error) {
      setIsGlobal(true);
    }
  }, []);

  const value: UserContextType = {
    addressErrors,
    userErrors,
    loading,
    user,
    addresses,
    selectedAddress,
    wishlist,
    isGlobal,
    deleteUserAddress,
    setUser,
    setWishlist,
    updateUserAddress,
    addAddress,
    setAddressErrors,
    setUserErrors,
    setLoading,
    handleSetSelectedAddress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext) as UserContextType;

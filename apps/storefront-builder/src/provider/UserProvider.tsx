"use client";
import { BankError, BankPayment, PaymentType, UserError, UserProfile } from "components/src/interfaces";
import { showPopup } from "components/src/minor";
import { fetchUserProfile } from "components/src/services/api/user";
import { formatISOToNormalDate } from "components/src/utils/date";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface UserContextType {
  user: UserProfile;
  userErrors: UserError | null;

  setUserErrors: (userErrors: UserError | null) => void;
  setUser: (user: UserProfile) => void;

  bankDetails?: BankPayment;
  setBankDetails?: (bankDetails: BankPayment) => void;

  setBankErrors?: (bankErrors: BankError | null) => void;
  bankErrors?: BankError | null;
}

const UserContext = createContext({});

interface UserProviderProps {
  children: ReactNode;
}

const INTIAL_USER_DATA: UserProfile = {
  id: "",
  email: "",
  isLoggedIn: false,
  loginMethod: null,
  name: "",
  sellerName: "",
  phone: "",
  dob: "",
  gender: "",
  image: null,
};

const INTIAL_BANK_DATA: BankPayment = {
  paymentType: PaymentType.BANK,
  bankName: "",
  bankAccountHolder: "",
  bankAccountNumber: undefined,
  upi: "",
  bankIfsc: "",
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const session = useSessionContext();
  const [user, setUser] = useState<UserProfile>(INTIAL_USER_DATA);
  const [bankDetails, setBankDetails] = useState<BankPayment>(INTIAL_BANK_DATA);
  const [userErrors, setUserErrors] = useState<UserError | null>(null);
  const [bankErrors, setBankErrors] = useState<BankError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (session.loading || !session.doesSessionExist) {
        return;
      }
      try {
        const { data, error } = await fetchUserProfile();

        if (!data || error) return;

        const userToUpdate = { ...data };
        if (userToUpdate.dob) {
          userToUpdate.dob = formatISOToNormalDate(userToUpdate.dob);
        }
        setUser(userToUpdate);
        if (data.payment) setBankDetails(data.payment);
        localStorage.setItem("isDevicesExist", data?.devices?.length ? "true" : "false");
      } catch (error) {
        showPopup("error", `Failed to fetch user data, ${error}`);
      }
    };

    fetchData();
  }, [session]);

  const value: UserContextType = {
    userErrors,
    user,
    bankDetails,
    bankErrors,
    setBankErrors,
    setBankDetails,
    setUser,
    setUserErrors,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext) as UserContextType;

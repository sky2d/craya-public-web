import { BankPayment, User, UserProfile } from "../../interfaces";
import { getRequest, putRequest } from "./apiRequests";

export const createUserProfilePayload = (user: UserProfile): Record<string, string | null> => {
  const payload: Record<string, string | null> = {};

  if (user.id) payload.id = user.id;
  if (user.phone) payload.phone = user.phone;
  if (user.name) payload.name = user.name;
  if (user.sellerName) payload.sellerName = user.sellerName;
  if (user.gender) payload.gender = user.gender;
  if (user.image?.id) payload.imageId = user.image.id;
  if (user.email) payload.email = user.email;
  if (user.dob) payload.dob = user.dob;

  return payload;
};

const createUserPayload = (user: User) => ({
  id: user.id,
  phone: user.phone,
  name: user.name,
  sellerName: user.name ? user.name : undefined,
  gender: user.gender ? user.gender : undefined,
  dob: user.dob ? user.dob : undefined,
  imageId: user.image ? user.image.id : undefined,
  email: user.email,
  socials: user.socials ? JSON.parse(JSON.stringify(user.socials)) : undefined,
});

const createPaymentPayload = (bankDetails: BankPayment & { upi?: string }) => {
  const payment: Partial<BankPayment & { upi?: string }> = {};

  for (const [key, value] of Object.entries(bankDetails)) {
    if (value !== undefined && value !== "") {
      payment[key as keyof typeof bankDetails] = value;
    }
  }

  return { payment }; // wrap inside "payment"
};

export const getUser = (token?: string) => {
  return getRequest<User>({
    endpoint: "/users",
    token: token,
  });
};
export const fetchUserProfile = () => {
  return getRequest<UserProfile>({
    endpoint: "/users",
  });
};

export const updateUser = (user: User) => {
  return putRequest<User>({
    endpoint: "/users",
    body: createUserPayload(user),
  });
};

export const updateBankDetailsUser = (bankDetails: BankPayment) => {
  return putRequest<UserProfile>({
    endpoint: "/users",
    body: createPaymentPayload(bankDetails),
  });
};
export const updateUserProfile = (user: UserProfile) => {
  return putRequest<UserProfile>({
    endpoint: "/users",
    body: createUserProfilePayload(user),
  });
};

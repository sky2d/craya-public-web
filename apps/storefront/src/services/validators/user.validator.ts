import { User, UserError } from "components/src/interfaces/user";

export const validateUserString = (user: User, fieldName: keyof User, extraMessage: string) => {
  const value = user[fieldName];

  if (value == null || (typeof value === "string" && !value.trim())) {
    return `${extraMessage} is required`;
  }
};

export const validateEmail = (user: User) => {
  if (!/^\S+@\S+\.\S+$/.test(user.email)) return "Email is not valid";
};

export const validatePhone = (user: User) => {
  const phone = user.phone.trim();
  const digits = phone.replace(/\D/g, "");
  const numberPart = digits.slice(-10);

  if (numberPart.length !== 10) {
    return "Phone number must be exactly 10 digits long (excluding country code).";
  }
};

const hasUserError = (userError: UserError) => {
  return Object.values(userError)
    .map(value => !!value)
    .includes(true);
};

export const validateUserFields = (user: User) => {
  const userError: UserError = {
    name: validateUserString(user, "name", "Name"),
    email: validateEmail(user),
    phone: validatePhone(user),
  };

  if (hasUserError(userError)) return userError;
  return null;
};

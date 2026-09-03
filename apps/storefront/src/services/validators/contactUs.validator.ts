import { ContactFormData, ContactFormError } from "components/src/interfaces";

export const validateString = (value: string, fieldName?: string, maximumChar?: number) => {
  if (!value || !value.trim()) {
    return `${fieldName ?? "This field"} is required`;
  }
  if (maximumChar && value.length > maximumChar) {
    return `${fieldName ?? "This field"} must not exceed ${maximumChar} characters`;
  }
  return undefined;
};
export const validateEmail = (email: string) => {
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Email is not valid";
  return undefined;
};

export const validatePhone = (phone: string) => {
  if (!/^\+?\d{10,15}$/.test(phone)) return "Phone Number must be of 10 digits";
  return undefined;
};

const hasUserError = (userError: ContactFormError) => {
  return Object.values(userError).some(value => !!value);
};

export const validateContactUsField = (user: ContactFormData) => {
  const userError: ContactFormError = {
    firstName: validateString(user.firstName, "First Name"),
    lastName: validateString(user.lastName, "Last Name"),
    email: validateEmail(user.email),
    phone: validatePhone(user.phone),
    message: validateString(user.message, "Message", 200),
  };

  return hasUserError(userError) ? userError : null;
};

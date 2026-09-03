import { Gender, UserError, UserProfile } from "components/src/interfaces";

const validateName = (name?: string | null) => {
  if (!name?.trim()) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters long";
  return undefined;
};

const validatePhone = (phone?: string | null) => {
  if (!phone?.trim()) return "Phone number is required";

  const cleaned = phone.replace(/[\s-]/g, "");
  const phoneRegex = /^(\+?\d{1,3})?0?[6-9]\d{9}$/;

  if (!phoneRegex.test(cleaned)) return "Invalid phone number";
  return undefined;
};

const validateDOB = (dob?: string | null) => {
  if (!dob) return "Date of birth is required";
  const date = new Date(dob);
  const today = new Date();
  if (isNaN(date.getTime())) return "Invalid date format";
  if (date >= today) return "Date of birth must be in the past";
  return undefined;
};

export const validateGender = (gender?: string | null) => {
  if (!gender?.trim()) return "Gender is required";

  const normalizedGender = gender.trim().toUpperCase() as keyof typeof Gender;

  if (!Object.values(Gender).includes(normalizedGender as Gender)) {
    return `Gender must be one of ${Object.values(Gender).join(", ")}`;
  }

  return undefined;
};
const validateEmail = (email?: string | null) => {
  if (!email) return undefined; // optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";
  return undefined;
};

// 🔹 Utility to check if any field has an error
const hasUserError = (userError: UserError) => Object.values(userError).some(value => !!value);

// 🔹 Main validator
export const validateUserProfileFields = (user: UserProfile): UserError | null => {
  const userError: UserError = {
    name: validateName(user.sellerName),
    phone: validatePhone(user.phone),
    dob: validateDOB(user.dob),
    gender: validateGender(user.gender),
    email: validateEmail(user.email),
  };

  if (hasUserError(userError)) return userError;
  return null;
};

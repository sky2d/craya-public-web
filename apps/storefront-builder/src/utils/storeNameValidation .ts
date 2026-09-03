export const StoreNameValidation = (storeName: string): boolean => {
  const regex = /^[a-zA-Z\s-]+$/;
  if (storeName === "") return true;
  return storeName !== "" && regex.test(storeName);
};

export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePhone = (phone: string): boolean => /^[6-9]\d{9}$/.test(phone);

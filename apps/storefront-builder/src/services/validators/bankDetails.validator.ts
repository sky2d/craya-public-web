import { BankError, BankPayment } from "components/src/interfaces";

// Checks if any field has an error
const hasBankError = (bankError: BankError) => {
  return Object.values(bankError).some(Boolean);
};

// Validate bank name or account holder (non-empty, letters only)
const validateBankStringFields = (value?: string, fieldName = "Field") => {
  if (!value?.trim()) return `${fieldName} is required`;
  if (!/^[a-zA-Z\s]+$/.test(value)) return `${fieldName} must contain only letters`;
};

// Validate bank account number (6-18 digits)
const validateBankAccountNumber = (accountNumber?: number) => {
  if (!accountNumber) return "Account Number is required";
  if (!/^\d{6,18}$/.test(accountNumber.toString())) return "Account Number must be 6-18 digits";
};

// Validate IFSC code (Razorpay & RBI standard: 4 letters + 0 + 6 digits)
const validateIfsc = (ifsc?: string) => {
  if (!ifsc?.trim()) return "IFSC Code is required";
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) return "Invalid IFSC Code";
};

// Validate UPI ID (example: name@bank)
const validateUpi = (upi?: string) => {
  if (!upi?.trim()) return "UPI ID is required";
  if (!/^[\w.-]{2,256}@[a-zA-Z]{2,64}$/.test(upi)) return "Invalid UPI ID";
};

// Main validator
export const validateBankFields = (bankDetails: BankPayment): BankError | null => {
  const bankError: BankError = {
    bankName: bankDetails.paymentType === "BANK" ? validateBankStringFields(bankDetails.bankName, "Bank Name") : undefined,
    accountHolder: bankDetails.paymentType === "BANK" ? validateBankStringFields(bankDetails.bankAccountHolder, "Account Holder Name") : undefined,
    accountNumber: bankDetails.paymentType === "BANK" ? validateBankAccountNumber(bankDetails.bankAccountNumber) : undefined,
    ifsc: bankDetails.paymentType === "BANK" ? validateIfsc(bankDetails.bankIfsc) : undefined,
    upi: bankDetails.paymentType === "UPI" ? validateUpi(bankDetails.upi) : undefined,
  };

  return hasBankError(bankError) ? bankError : null;
};

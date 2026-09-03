import { postRequest } from "./apiRequests";

interface EmailManagement {
  message: string;
}

export const triggerStoreOnboardingEmail = (userId: string, emailType: string) => {
  return postRequest<EmailManagement>({
    endpoint: "/emails/send-predefined",
    body: { userId, emailType },
  });
};
export const triggerProductDetailsOnboardingEmail = (userId: string, emailType: string) => {
  return postRequest<EmailManagement>({
    endpoint: "/emails/send-predefined",
    body: { userId, emailType },
  });
};
export const triggerBuilderOnboardingEmail = (userId: string, emailType: string) => {
  return postRequest<EmailManagement>({
    endpoint: "/emails/send-predefined",
    body: { userId, emailType },
  });
};
export const downloadSellerApp = (userId: string, emailType: string) => {
  return postRequest<EmailManagement>({
    endpoint: "/emails/send-predefined",
    body: { userId, emailType },
  });
};

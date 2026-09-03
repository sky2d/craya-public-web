import { postRequest } from "./apiRequests";

export const verifyOTP = (token: string, phoneNumber: string) => {
  return postRequest({
    endpoint: "/otp/verify",
    body: {
      accessToken: token,
      phoneNumber: phoneNumber,
    },
  });
};

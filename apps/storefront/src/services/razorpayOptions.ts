import { Address, User } from "components/src/interfaces";
import { PaymentSuccessConfirmation } from "components/src/interfaces/orders";
import { showPopup } from "components/src/minor";
import CrayaFavicon from "../../public/icons/PaymentSuccessIcon.svg";

interface RazorpayOptionsParams {
  user: User;
  selectedAddress: Address;
  pgOrderId: string;
  amount: number;
  handlePaymentSuccess: (response: PaymentSuccessConfirmation, pgOrderId: string) => Promise<void>;
  handlePaymentFailed: (pgOrderId: string) => Promise<void>;
}

export const getRazorpayOptions = ({
  user,
  selectedAddress,
  pgOrderId,
  amount,
  handlePaymentSuccess,
  handlePaymentFailed,
}: RazorpayOptionsParams) => {
  return {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: amount,
    currency: "INR",
    name: user.name,
    description: "Craya is your go-to platform for seamless transactions, efficient management, and a user-friendly experience.",
    image: CrayaFavicon.src,
    order_id: pgOrderId,
    handler: async function (response: PaymentSuccessConfirmation) {
      try {
        await handlePaymentSuccess(response, pgOrderId);
      } catch {
        showPopup("error", `Error processing payment`);
      }
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },
    notes: {
      address: `${selectedAddress.flatNumber}, ${selectedAddress.area}, ${selectedAddress.landMark}, ${selectedAddress.town}, ${selectedAddress.state}, ${selectedAddress.pinCode}`,
    },
    theme: {
      color: "#7C54E9",
    },
    modal: {
      ondismiss: function () {
        showPopup("warning", "Payment process was cancelled");
        handlePaymentFailed(pgOrderId);
      },
    },
  };
};

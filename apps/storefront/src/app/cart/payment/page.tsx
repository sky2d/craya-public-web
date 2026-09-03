import { PaymentStatusEnum } from "components/src/interfaces/orders";
import { Metadata } from "next";
import { PaymentStatus } from "./PaymentStatus";

interface PaymentPageProps {
  searchParams: {
    status: PaymentStatusEnum;
    orderId: string;
  };
}

export const metadata: Metadata = {
  title: `Safe & Easy Payment – Powered by Craya`,
  description: `Craya payment gateway, secure checkout fashion, powered by Craya`,
  keywords: [`pay`, "Craya payment gateway", "secure checkout fashion", "powered by Craya"],
  openGraph: {
    title: `Complete Your Payment – Powered by Craya`,
    description: `One last step. Pay securely for your order via Craya’s checkout flow.`,
    url: `https://craya.shop/products/payment`,
    images: [
      {
        url: "https://craya.shop/images/og-payment.jpg",
        alt: `Complete Payment for`,
      },
    ],
    type: "website",
  },
};

const Payment = ({ searchParams }: PaymentPageProps) => {
  let paymentMethod: string | undefined;

  if (searchParams.status === PaymentStatusEnum.Paid) {
    paymentMethod = "Online - Prepaid";
  } else if (searchParams.status === PaymentStatusEnum.Cod) {
    paymentMethod = "Cash On Delivery";
  }

  return (
    <>
      <PaymentStatus status={searchParams.status} paymentMethod={paymentMethod} />
    </>
  );
};

export default Payment;

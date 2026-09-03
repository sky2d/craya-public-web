import { CreditCardOutlined, HomeOutlined } from "@ant-design/icons";
interface PaymentInfoCardProps {
  paymentGateway: string;
}

const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({ paymentGateway }) => (
  <div className="bg-white rounded-xl border border-[#CDCDCD] p-4 shadow-sm">
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex items-center space-x-3">
        <CreditCardOutlined className="text-gray-500 text-xl" />
        <div>
          <p className="text-[clamp(10px,0.6vw,12px)] text-black-dark3">Payment Method</p>
          <p className="text-[clamp(10px,0.75vw,14px)] font-medium">{paymentGateway}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <HomeOutlined className="text-gray-500 text-xl" />
        <div>
          <p className="text-[clamp(10px,0.6vw,12px)] text-black-dark3">Order Type</p>
          <p className="text-[clamp(10px,0.75vw,14px)] font-medium">Home Delivery</p>
        </div>
      </div>
    </div>
  </div>
);

export default PaymentInfoCard;

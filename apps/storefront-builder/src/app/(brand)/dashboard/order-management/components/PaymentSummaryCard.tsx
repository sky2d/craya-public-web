import { formatCurrency } from "@/utils/currency";
import { Order } from "components/src/interfaces/orders";

interface PaymentSummaryCardProps {
  order: Order;
}

const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({ order }) => (
  <div className="bg-white rounded-xl border border-[#CDCDCD] p-4 shadow-sm">
    <div className="mb-4 border-b border-[#D8D8D8] p-1">
      <h1 className="text-[clamp(14px,1vw,18px)] font-medium">Payment</h1>
    </div>
    <div className="space-y-3 text-[clamp(10px,0.7vw,14px)] font-normal text-black-dark3">
      <div className="flex justify-between">
        <span>Sub Total</span>
        <span className="text-gray-800 font-medium">{formatCurrency((order.amount ?? 0) / 100)}</span>
      </div>
      {order.couponDiscountAmount ? (
        <div className="flex justify-between">
          <span className="text-gray-600">Coupon Discount</span>
          <span className="text-gray-800 font-medium">{formatCurrency(order.couponDiscountAmount / 100)}</span>
        </div>
      ) : null}
      {order.cartTotalDeliveryCharge ? (
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping Cost</span>
          <span className="text-gray-800 font-medium">{formatCurrency(order.cartTotalDeliveryCharge / 100)}</span>
        </div>
      ) : null}
    </div>
  </div>
);

export default PaymentSummaryCard;

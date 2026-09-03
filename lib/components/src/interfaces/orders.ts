import { Address } from "./address";
import { Cart } from "./cart";
import { Store } from "./store";
import { User } from "./user";

export enum ReturnRefundAction {
  EXCHANGE = "exchange",
}

export enum PaymentStatusEnum {
  Pending = "PENDING",
  Paid = "PAID",
  Failed = "FAILED",
  Cod = "COD",
}

export enum PaymentGatewayEnum {
  COD = "COD",
  PREPAID = "PREPAID",
}

export enum DeliveryStatusEnum {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  PICKUP_SCHEDULED = "PICKUP_SCHEDULED",
  PICKUP_GENERATED = "PICKUP_GENERATED",
  PICKUP_COMPLETED = "PICKUP_COMPLETED",
  IN_TRANSIT = "IN_TRANSIT",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  RTO_INITIATED = "RTO_INITIATED",
  RTO_DELIVERED = "RTO_DELIVERED",
  RETURN_REQUESTED = "RETURN_REQUESTED",
  EXCHANGE_REQUESTED = "EXCHANGE_REQUESTED",
  CANCELLED = "CANCELLED",
  LOST = "LOST",
  DAMAGED = "DAMAGED",
  PARTIAL_DELIVERY = "PARTIAL_DELIVERY",
}

export enum PaymentMethod {
  COD = "COD",
  Prepaid = "PREPAID",
}

export interface Order {
  id: string;
  user: User;
  address: Address;
  cart: Cart;
  store: Store;
  cartTotalDeliveryCharge: number | null;
  awbCode: string;
  createdAt: string;
  amount: number | null;
  originalAmount: number;
  couponDiscountAmount: number | null;
  receipt: string;
  pgOrderId: string;
  estimatedDeliveryDate: string;
  paymentStatus: PaymentStatusEnum;
  paymentStatusUpdatedAt: string | null;
  deliveryStatus: DeliveryStatusEnum;
  deliveryStatusAt: string | null;
  paymentGateway: PaymentGatewayEnum;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
}

export interface PaymentSuccessConfirmation {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentFailedConfirmation {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string | null;
    };
  };
}

export interface RazorpayInstance {
  open(): void;
  close(): void;
  on(event: string, handler: (response: unknown) => void): void;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: PaymentSuccessConfirmation) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export interface TrackingData {
  track_status: number;
  shipment_status: number;
  shipment_track: ShipmentTrack[];
  shipment_track_activities: ShipmentTrackActivity[];
  track_url: string;
  etd: string;
}

export interface ShipmentTrack {
  id: number;
  awb_code: string;
  courier_company_id: number;
  shipment_id: number;
  order_id: number;
  pickup_date: string | null;
  delivered_date: string | null;
  weight: string;
  packages: number;
  current_status: string;
  delivered_to: string;
  destination: string;
  consignee_name: string;
  origin: string;
  courier_agent_details: string | null;
  edd: string;
}

export interface ShipmentTrackActivity {
  date: string;
  status: string;
  activity: string;
  location: string;
  "sr-status": string;
}

export interface CourierDeliveryInfo {
  id: number;
  courier_name: string;
  courier_company_id: number;
  city: string;
  state: string;
  postcode: string;
  estimated_delivery_days: string;
  etd: string;
  etd_hours: number;
  charge_weight: number;
  freight_charge: number;
  rate: number;

  delivery_performance: number;
  pickup_performance: number;
  tracking_performance: number;
  rto_performance: number;

  cod: number;
  cod_charges: number;

  is_surface: boolean;
  is_hyperlocal: boolean;
  is_international: number;

  realtime_tracking: string; // e.g. "Real Time"
  call_before_delivery: string; // e.g. "Available"
  delivery_boy_contact: string; // e.g. "Available"
}

export interface ExchangeItem {
  productSkuId: string;
  quantity: number;
  replacingSkuId: string;
  replacingSkuName: string;
  qcImageUrl: string;
  qcBrand: string;
  qcColor: string;
  qcSize: string;
}

export interface ExchangeRequest {
  itemsToExchange: ExchangeItem[];
  returnReason: string;
}

export interface ExchangeItemError {
  productSkuId?: string;
  quantity?: string;
  replacingSkuId?: string;
  replacingSkuName?: string;
  qcImageUrl?: string;
  qcBrand?: string;
  qcColor?: string;
  qcSize?: string;
}

export interface ExchangeError {
  returnReason?: string;
  itemsToExchange?: {
    general?: string;
    itemErrors?: ExchangeItemError[];
  };
}

export interface MonthlyPayoutData {
  [monthYear: string]: MonthData;
}

export interface MonthData {
  totalPayout: number;
  totalOrdersCount: number;
  weeklyBreakdown: WeeklyBreakdown;
  allOrdersInMonth: Order[];
}

export interface WeeklyBreakdown {
  week1: WeekData;
  week2: WeekData;
  week3: WeekData;
  week4: WeekData;
}

export interface WeekData {
  week: number;
  totalOrdersCount: number;
  totalAmount: number;
  orders: Order[];
}

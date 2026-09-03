import { Coupon } from "./Coupon";
import { Product, ProductDetail, ProductSKU } from "./product";
import { Store } from "./store";

export interface CartItem {
  id?: string;
  cartId?: string;
  product: Product;
  productSKU: ProductSKU;
  productDetails: ProductDetail[];
  quantity: number;
  store: Store;
  storeId?: string;
}

export interface Cart {
  id: string;
  amount: number | null;
  userId: string;
  originalAmount: number | null;
  appliedCoupons: Coupon[] | null;
  cartItems?: CartItem[];
}

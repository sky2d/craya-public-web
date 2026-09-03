"use client";

import EmptyCart from "@/assets/icons/EmptyCart.svg";
import CartItemCard from "@/components/product/CartItemCard";
import { WhiteBackgroundWrapper } from "@/components/wrapper/WhiteBackgroundWrapper";
import { useCartContext } from "@/provider/CartProvider";
import { useCouponContext } from "@/provider/CouponProvider";
import { useUserContext } from "@/provider/UserProvider";
import { Loader } from "@/utils/loader";
import { Cart, ProductStatusEnum } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { PaymentMethod } from "components/src/interfaces/orders";
import { PageHeader } from "components/src/major/PageHeader";
import { Button2, showPopup } from "components/src/minor";
import { removeCoupon } from "components/src/services/api";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useMemo, useState } from "react";
import { RiCoupon3Line } from "react-icons/ri";

const CouponModel = dynamic(() => import("@/components/model/CouponModel"), { ssr: false });
const AddressSection = dynamic(() => import("@/components/user/AddressSection "), { ssr: false });
const PaymentModal = dynamic(() => import("@/components/model/PaymentModal"), { ssr: false });
const EmptyState = dynamic(() => import("components/src/major/EmptyState"), { ssr: false });

const CheckoutScreen = () => {
  const router = useRouter();
  const { appliedCoupon, coupons, setAppliedCoupon, setCouponLoading, couponLoading, couponDiscount, checkoutDeliveryCharge } = useCouponContext();
  const { user, selectedAddress } = useUserContext();
  const { totalMRP, cart, cartLoading, setCartLoading, addToCart } = useCartContext();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [shouldLoadRazorpay, setShouldLoadRazorpay] = useState(false);

  const filteredCart: Cart | null = useMemo(() => {
    if (!cart) return null;

    return {
      ...cart,
      cartItems: cart.cartItems?.filter(item => !item.product.isOutOfStock && item.product.status !== ProductStatusEnum.DISABLED) ?? [],
    };
  }, [cart]);

  const triggerPayment = async (paymentMethod: PaymentMethod) => {
    const { handlePayment } = await import("@/utils/paymentHandler");
    if (!cart || !user || !selectedAddress) return;

    await handlePayment(paymentMethod, {
      cart,
      user,
      selectedAddress,
      checkoutDeliveryCharge,
      couponDiscount,
      setCartLoading,
      router,
    });
  };

  const handleRemoveCoupon = async () => {
    if (!appliedCoupon || !cart || !cart.cartItems || !cart.appliedCoupons) return;
    setCouponLoading(true);

    const { data, error } = await removeCoupon(cart?.id);
    setCouponLoading(false);
    if (!data || error) {
      showPopup("error", "Failed to remove coupon. Please try again.");
      return;
    }
    setAppliedCoupon(null);
    addToCart({ ...cart, appliedCoupons: null });
    showPopup("warning", `Coupon "${appliedCoupon?.title}" has been removed.`);
  };

  if (cartLoading || couponLoading || !cart?.id) {
    return <Loader />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="w-full">
        {shouldLoadRazorpay && <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />}

        <PageHeader title="Checkout" subtitle={`${cart?.cartItems?.length || 0} products`} />
      </div>

      <div className="flex w-full flex-col items-center justify-center md:w-3/4">
        {cart && cart.cartItems?.length ? (
          <div className="flex w-full flex-col justify-center lg:flex-row">
            <div className="my-4 flex w-full max-w-[50em] flex-col items-center p-2">
              {cart.cartItems?.filter(item => item?.id && item?.product).map(cartItem => <CartItemCard key={cartItem.id} cartItem={cartItem} />)}
            </div>
            {(cart?.cartItems ?? []).length > 0 && (
              <div className="w-full p-2">
                <WhiteBackgroundWrapper>
                  <span className="p-2 text-4xl font-semibold">Price Details</span>

                  <div className="flex justify-between p-2">
                    <div className="flex flex-col">
                      <span className="text-lg font-medium md:text-xl">Total MRP:</span>
                      <span className="text-lg font-medium md:text-xl">Coupon Discount:</span>
                      <span className="text-lg font-medium md:text-xl">Delivery Charges:</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-lg font-medium md:text-xl">₹ {totalMRP}</span>
                      <span style={{ color: couponDiscount ? "#7EC47C" : "black" }} className="text-lg font-medium md:text-xl">
                        - ₹ {couponDiscount}
                      </span>
                      <span className="text-lg font-medium md:text-xl">₹ {checkoutDeliveryCharge}</span>
                    </div>
                  </div>

                  <div className="flex justify-center rounded-[10px] border-[1px] p-2">
                    <span className="body-normal">Cart Subtotal: ₹ {cart.amount}</span>
                  </div>

                  <div className="my-2 flex items-center justify-between rounded-[10px] border-[1px] border-black-dark1 p-4">
                    <p className="flex items-center justify-center">
                      <span className="mr-2">
                        <RiCoupon3Line className="text-lg" />
                      </span>
                      <span className="text-2xl font-medium">Apply coupon</span>
                    </p>
                    <p className="group relative">
                      <span
                        className="cursor-pointer text-brand-color1 body-normal"
                        onClick={() => {
                          setIsCouponModalOpen(true);
                        }}
                      >
                        Select
                      </span>
                      <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 bg-brand-color1 transition-all group-hover:w-3/6"></span>
                      <span className="absolute -bottom-1 right-1/2 h-0.5 w-0 bg-brand-color1 transition-all group-hover:w-3/6"></span>
                    </p>
                  </div>
                  {appliedCoupon && (
                    <div
                      className="relative my-4 flex items-center justify-between rounded-2xl border-2 p-4 shadow-lg transition-all"
                      style={{
                        backgroundColor: "rgba(124, 84, 233, 0.1)",
                        borderColor: "rgba(124, 84, 233, 0.8)",
                      }}
                    >
                      <div className="flex w-full items-center justify-between space-x-3">
                        <div className="flex items-start space-x-2">
                          {/* Coupon Icon */}
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-full"
                            style={{ backgroundColor: "rgba(124, 84, 233, 0.2)" }}
                          >
                            <RiCoupon3Line className="text-2xl text-[#7C54E9]" />
                          </div>

                          {/* Coupon Details */}
                          <div className="flex flex-col">
                            <h3 className="text-lg font-bold text-[#7C54E9]">{appliedCoupon.title}</h3>
                            <p className="text-gray-600 text-sm">{appliedCoupon.description}</p>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <p className="group relative">
                          <span className="cursor-pointer text-red-500 body-normal" onClick={handleRemoveCoupon}>
                            Remove
                          </span>
                          <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 bg-red-500 transition-all group-hover:w-3/6"></span>
                          <span className="absolute -bottom-1 right-1/2 h-0.5 w-0 bg-red-500 transition-all group-hover:w-3/6"></span>
                        </p>

                        {/* Success Badge */}
                        <div
                          className="absolute right-0 top-0 -translate-y-2 translate-x-2 rounded-full px-3 py-1 text-xs font-semibold"
                          style={{ backgroundColor: "#7C54E9", color: "white" }}
                        >
                          Selected
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="">
                    <Button2
                      type={ButtonType.PRIMARY}
                      buttonSize="lg"
                      disabled={cartLoading || !filteredCart || filteredCart.cartItems?.length === 0}
                      label={`Proceed to Buy (${filteredCart?.cartItems?.length ?? 0} items)`}
                      handleClick={() => {
                        setIsPaymentModalOpen(true);
                        setShouldLoadRazorpay(true);
                      }}
                    />
                  </div>
                </WhiteBackgroundWrapper>

                <WhiteBackgroundWrapper>
                  <p className="body-sm-semibold">Deliver to-</p>
                </WhiteBackgroundWrapper>
                <AddressSection />
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-auto min-h-[80vh] w-full items-center justify-center">
            <EmptyState
              image={<Image src={EmptyCart} draggable={false} alt="No orders" fill className="h-full w-full object-contain" />}
              title="Your Cart is Empty"
              subtitle="Looks like you haven't added anything to your cart yet."
              onButtonClick={() => {
                router.back();
              }}
            />
          </div>
        )}
        {coupons && (
          <CouponModel
            isModalOpen={isCouponModalOpen}
            handleCancel={() => {
              setIsCouponModalOpen(false);
            }}
          />
        )}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
          }}
          handleNetBanking={() => {
            setIsPaymentModalOpen(false);
            setShouldLoadRazorpay(true);
            triggerPayment(PaymentMethod.Prepaid);
          }}
          handleCashOnDelivery={() => {
            setIsPaymentModalOpen(false);
            triggerPayment(PaymentMethod.COD);
          }}
          totalAmount={cart.amount ?? 0}
        />
      </div>
    </div>
  );
};

export default CheckoutScreen;

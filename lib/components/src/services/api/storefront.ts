"use  client";
import {
  Address,
  Cart,
  CartItem,
  ContactFormData,
  Policies,
  ProductReview,
  Store,
  StoreData,
  StorefrontComponent,
  StorefrontComponentData,
  Wishlist,
  WishlistItems,
} from "../../interfaces";
import { Coupon, CouponResponse } from "../../interfaces/Coupon";
import { deleteRequest, getRequest, postRequest, putRequest } from "./apiRequests";

const createStorefrontDataPayload = (data: StorefrontComponentData) => ({
  texts: data.texts,
  extraTexts: data.extraTexts,
  imageSize: data.imageSize,
  storeId: data.store?.id ?? null,
  productsPerImage: data.productsPerImage,
  images: data.images.map(image => image.id).filter(_ => !!_),
  products: data.products.map(product => product.id).filter(_ => !!_),
  loops: data.loops.map(loop => loop.id).filter(_ => !!_),
  coupons: data.coupons.map(coupon => coupon.id).filter(_ => !!_),
  imageCarouselImages: {
    android: (data.imageCarouselImages?.android || []).map(image => image.id).filter(_ => !!_),
    web: (data.imageCarouselImages?.web || []).map(image => image.id).filter(_ => !!_),
  },
});

const createStorefrontPayload = (storeId: string, storefrontComponent: StorefrontComponent) => ({
  storeId: storeId,
  position: storefrontComponent.position,
  type: storefrontComponent.type,
  data: createStorefrontDataPayload(storefrontComponent.data),
  dataId: storefrontComponent.dataId,
});

const createCartPayload = (selectedCartItem: CartItem, cartId?: string) => ({
  cartId: cartId ? cartId : selectedCartItem.cartId,
  productId: selectedCartItem.product.id,
  productSKUId: selectedCartItem.productSKU.id,
  quantity: selectedCartItem.quantity,
});

const createAddressPayload = (address: Address) => ({
  customerName: address.customerName,
  flatNumber: address.flatNumber,
  area: address.area,
  landMark: address.landMark,
  town: address.town,
  state: address.state,
  pinCode: address.pinCode,
  phoneNumber: address.phoneNumber,
  isSelected: address.isSelected,
});

const createReviewPayload = (review: ProductReview) => ({
  productId: review.productId,
  comment: review.comment,
  rating: review.rating,
  imageIds: review.imageId,
});

const createContactPayload = (contact: ContactFormData) => ({
  firstName: contact.firstName,
  lastName: contact.lastName,
  email: contact.email,
  phone: contact.phone,
  message: contact.message,
});

export const createPolicyPayload = (policy: Partial<Policies>) => {
  const cleaned = Object.fromEntries(Object.entries(policy).filter(([, v]) => v !== undefined && v !== null));

  return {
    ...cleaned,
    isFake: policy.isFake ?? false,
  };
};

export const createStorefrontComponent = (storeId: string, storefrontComponent: StorefrontComponent) => {
  return postRequest<StorefrontComponent>({
    endpoint: "/storefront",
    body: createStorefrontPayload(storeId, storefrontComponent),
  });
};

export const getStoreBasicInfo = (subdomain: string) => {
  return getRequest<Store>({
    endpoint: `/stores/by-name/${subdomain}`,
  });
};

export const getStoreByName = (subdomain: string) => {
  return getRequest<StoreData>({
    endpoint: `/stores/getStoreBySubdomain/${subdomain}`,
  });
};

export const getStorefront = (storeId: string, token?: string) => {
  return getRequest<StorefrontComponent[]>({
    endpoint: `/storefront/${storeId}`,
    token: token,
  });
};

export const updateStorefrontComponent = (storeId: string, storefrontComponent: StorefrontComponent) => {
  const { id } = storefrontComponent;
  return putRequest<StorefrontComponent>({
    endpoint: `/storefront/${id}`,
    body: createStorefrontPayload(storeId, storefrontComponent),
  });
};

export const updateComponentPositions = (componentIDS: string[], storeId: string) => {
  return putRequest<string[]>({
    endpoint: `/storefront/updateComponentPositions/${storeId}`,
    body: { componentIds: componentIDS },
  });
};

export const deleteStorefrontComponent = (componentId: string) => {
  return deleteRequest<StorefrontComponent>({
    endpoint: `/storefront/${componentId}`,
  });
};

export const getStorefrontLink = (StoreId: string) => {
  return getRequest<{ url: string }>({
    endpoint: `/stores/generateStoreUrl/${StoreId}`,
  });
};

export const getCart = () => {
  return getRequest<Cart>({
    endpoint: "/cart",
  });
};

export const createCart = (selectedCartItem: CartItem, cartId?: string) => {
  return postRequest<Cart>({
    endpoint: "/cart/item",
    body: createCartPayload(selectedCartItem, cartId),
  });
};

export const updateCart = (selectedCartItem: CartItem, cartId?: string) => {
  return putRequest<Cart>({
    endpoint: `/cart/item/${selectedCartItem.id}`,
    body: createCartPayload(selectedCartItem, cartId),
  });
};

export const deleteCart = (cartId: string) => {
  return deleteRequest<Cart>({
    endpoint: `/cart/item/${cartId}`,
  });
};

export const getAllAddresses = () => {
  return getRequest<Address[]>({
    endpoint: "/address",
  });
};

export const createAddress = (address: Address) => {
  return postRequest<Address>({
    endpoint: "/address",
    body: createAddressPayload(address),
  });
};

export const updateAddress = (address: Address) => {
  return putRequest<Address>({
    endpoint: `/address/${address.id}`,
    body: createAddressPayload(address),
  });
};

export const deleteAddress = (address: Address) => {
  return deleteRequest<Address[]>({
    endpoint: `/address/${address.id}`,
  });
};

export const postReview = (review: ProductReview) => {
  return postRequest({
    endpoint: "/reviews",
    body: createReviewPayload(review),
  });
};

export const getPolicies = (storeId: string, token?: string) => {
  return getRequest<Policies[]>({
    endpoint: `/store-policies/store/${storeId}`,
    token,
  });
};

export const createPolicy = (payload: Policies) => {
  return postRequest<Policies>({
    endpoint: "/store-policies",
    body: createPolicyPayload(payload),
  });
};
export const updatePolicy = (payload: Policies) => {
  return putRequest<Policies>({
    endpoint: `/store-policies/${payload.id}`,
    body: createPolicyPayload(payload),
  });
};
export const getWishlists = (token?: string) => {
  return getRequest<Wishlist>({
    endpoint: `/wishlist`,
    token: token,
  });
};

export const createWishlist = (wishlistId: string, productId: string, productSKUId: string) => {
  return postRequest<WishlistItems>({
    endpoint: `/wishlist/item`,
    body: { wishlistId, productId, productSKUId },
  });
};

export const removeWishlistItem = (wishListItemId: string) => {
  return deleteRequest<Wishlist>({
    endpoint: `/wishlist/item/${wishListItemId}`,
  });
};

export const contactUs = (contact: ContactFormData) => {
  return postRequest({
    endpoint: "/contact-us",
    body: createContactPayload(contact),
  });
};

export const applyCoupon = (couponCode: string, cartId: string) => {
  return postRequest<CouponResponse>({
    endpoint: "/orders/cart/apply-coupon",
    body: { cartId, couponCode },
  });
};

export const removeCoupon = (cartId: string) => {
  return postRequest<Coupon>({
    endpoint: "/orders/cart/remove-coupon",
    body: { cartId },
  });
};

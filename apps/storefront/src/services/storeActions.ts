import { SimpleProduct, StorefrontComponentType, User, Wishlist, WishlistItems } from "components/src/interfaces";
import { ModalKey } from "components/src/interfaces/modal";
import { showPopup } from "components/src/minor";
import { createWishlist, removeWishlistItem } from "components/src/services/api";
import { getEnvironmentInfo } from "components/src/utils/domain";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleProductsPress = (
  products: SimpleProduct[],
  router: AppRouterInstance,
  handleUpdateSearchedProduct: (products: SimpleProduct[]) => void,
  component?: StorefrontComponentType,
) => {
  if (products.length > 0) {
    handleUpdateSearchedProduct(products);

    let basePath = "";
    if (typeof window !== "undefined") {
      const storeMatch = window.location.pathname.match(/^\/store\/([^/]+)/);
      if (storeMatch) {
        basePath = `/store/${storeMatch[1]}`;
      }
    }

    if (component) {
      router.push(`${basePath}/products?component=${component}`);
    } else {
      router.push(`${basePath}/products`);
    }
  }
};

export const handleProductPress = (router: AppRouterInstance, url: string) => {
  if (typeof window !== "undefined") {
    const storeMatch = window.location.pathname.match(/^\/store\/([^/]+)/);
    if (storeMatch && !url.startsWith("/store/")) {
      router.push(`/store/${storeMatch[1]}${url}`);
      return;
    }
  }
  router.push(url);
};

export const handleAddToWishList = async (
  product: SimpleProduct,
  updateWishlist: (newWishlist: Wishlist) => void,
  wishlist?: Wishlist,
  user?: User,
  openModal?: (modal: ModalKey) => void,
) => {
  if (!user && openModal) {
    openModal("login");
    return;
  }

  const productInWishlist = wishlist?.wishlistItems?.find((item: WishlistItems) => item.product.id === product.id);

  if (productInWishlist) {
    await removeWishlistItem(productInWishlist.id!);

    if (wishlist) {
      updateWishlist({
        ...wishlist,
        wishlistItems: wishlist.wishlistItems.filter((item: WishlistItems) => item.product.id !== product.id),
      });
      showPopup("success", "Product removed from wishlist!");
    }
  } else {
    if (wishlist?.id && product && product.id && product.productSKUs) {
      if (product.productSKUs[0]?.id) {
        const { data } = await createWishlist(wishlist.id, product.id, product.productSKUs[0].id);
        if (!data) {
          return;
        }
        updateWishlist({
          ...wishlist,
          wishlistItems: [...wishlist.wishlistItems, data],
        });
      }
    }
  }
};
export const handleShare = async (link: string, storeId?: string) => {
  if (!storeId) {
    showPopup("error", "Store ID is required for sharing.");
    return;
  }

  const { isLocal, baseDomain, port, subdomain, protocol } = getEnvironmentInfo();

  const domain = `${protocol}://${subdomain ? `${subdomain}.${baseDomain}` : baseDomain}`;
  const shareUrl = `${domain}${port}/videos?storeId=${storeId}&reel=${encodeURIComponent(link)}`;

  try {
    await navigator.clipboard.writeText(shareUrl);
  } catch (err) {
    showPopup("error", "Failed to copy link to clipboard. Please try again.");
    return;
  }
  const shareOptions = [
    { name: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(shareUrl)}` },
    { name: "Twitter", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}` },
    { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: "Telegram", url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}` },
    { name: "Email", url: `mailto:?subject=Check this out&body=${encodeURIComponent(shareUrl)}` },
    { name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
  ];

  if (navigator.share && window.isSecureContext && !isLocal) {
    try {
      await navigator.share({
        title: "Check this out",
        text: "Check out this video!",
        url: shareUrl,
      });
      return;
    } catch (error) {
      showPopup("error", "Failed to share via native share. Please try another method.");
      return;
    }
  }
  window.open(shareOptions[0].url, "_blank");
};

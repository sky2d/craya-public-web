"use client";

import EmptyWishlist from "@/assets/icons/EmptyWishList.svg";
import { useModalContext } from "@/provider/ModalProvider";
import { useUserContext } from "@/provider/UserProvider";
import { handleAddToWishList, handleProductPress } from "@/services/storeActions";
import { Loader } from "@/utils/loader";
import { StorefrontActions, StorefrontComponentData, Wishlist, WishlistItems } from "components/src/interfaces";
import EmptyState from "components/src/major/EmptyState";
import { showPopup } from "components/src/minor";
import { createStorefrontData } from "components/src/services/storefront";
import { AllProductGrid } from "components/src/storefront/main/ProductGrid";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WishListProduct = () => {
  const { wishlist, setWishlist, loading } = useUserContext();
  const { user } = useUserContext();
  const { openModal } = useModalContext();
  const router = useRouter();

  const updateWishlist = (newWishlist: Wishlist) => {
    setWishlist(newWishlist);
  };

  const handleComponentAction = (action: StorefrontActions, data: StorefrontComponentData) => {
    if (action === StorefrontActions.ADD_TO_WISHLIST) {
      handleAddToWishList(data.products[0], updateWishlist, wishlist, user, openModal);
    } else if (action === StorefrontActions.PRODUCT_PRESS) {
      const url = data.store?.url;
      if (!url) {
        return showPopup("error", "Product URL not found");
      }
      handleProductPress(router, `${url}/products/details/${data.products[0].id}`);
    }
  };

  const storefrontData = createStorefrontData({
    products: wishlist?.wishlistItems.map((item: WishlistItems) => item.product) || [],
  });

  if (loading) {
    return <Loader />;
  }

  if (!wishlist || wishlist.wishlistItems.length === 0) {
    return (
      <div className="flex h-auto min-h-[80vh] w-full items-center justify-center">
        <EmptyState
          image={<Image src={EmptyWishlist} draggable={false} alt="Empty WishlistItems" fill className="h-full w-full object-contain" />}
          title="Nothing is added to Wishlist"
          subtitle="Looks like you haven’t added anything in the wishlist"
          onButtonClick={() => {
            router.back();
          }}
        />
      </div>
    );
  }

  return (
    <div className="my-8 w-full sm:w-3/4">
      <AllProductGrid data={storefrontData} handlerFunction={handleComponentAction} wishlistItems={wishlist?.wishlistItems} />
    </div>
  );
};

export default WishListProduct;

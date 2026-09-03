import { Loop, Store, StorefrontHandlerFunction, WishlistItems } from "../../../interfaces";
import { createStorefrontData } from "../../../services/storefront";
import { FeedVideoCard } from "../ProductGrid";

interface ProductSidebarProps {
  video: Loop;
  store?: Store;
  wishlistItems?: WishlistItems[];
  onVideoClick?: (id: number) => void;
  handlerFunction?: StorefrontHandlerFunction;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({ video, store, wishlistItems, handlerFunction }) => {
  if (!video?.products?.length) return null;

  const storefrontData = createStorefrontData({ products: video.products, store });

  return (
    <div className={`flex h-full max-h-[80vh] w-full flex-col items-start justify-start overflow-y-auto p-2 md:w-1/3`}>
      <FeedVideoCard key={storefrontData.id} data={storefrontData} wishlistItems={wishlistItems} handlerFunction={handlerFunction} />
    </div>
  );
};

export const ModalProductSidebar: React.FC<ProductSidebarProps> = ({ video, store, wishlistItems, handlerFunction }) => {
  if (!video?.products?.length) return null;

  const storefrontData = createStorefrontData({ products: video.products, store });

  return (
    <div className="my-auto hidden h-auto max-h-[80vh] min-h-52 w-auto min-w-44 max-w-[30%] overflow-y-auto p-2 md:block">
      <div className="h-full w-full rounded-[11px] bg-white-light4">
        <p className="rounded-t-[11px] bg-[#AC1E2E] text-center text-xl font-medium text-white-light4">Products</p>

        <FeedVideoCard key={storefrontData.id} data={storefrontData} wishlistItems={wishlistItems} handlerFunction={handlerFunction} />
      </div>
    </div>
  );
};

import { useStoreContext } from "@/provider/StoreProvider";
import Image from "next/image";
export const StoreLogoName = () => {
  const { store } = useStoreContext();

  if (!store.id) return null;
  return (
    <div className="flex items-center rounded-[50px] bg-gray p-2">
      <div className="aspect-square max-h-[53px] overflow-hidden rounded-full">
        {store.logo ? (
          <Image
            src={store.logo?.fileUrl}
            alt="Store logo"
            width={53}
            height={53}
            className="aspect-square h-full rounded-full object-contain"
            quality={100}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-gray-500 text-center text-sm">No Image</span>
          </div>
        )}
      </div>
      <div className="p-2">
        <p className="text-lg font-normal">{store?.name ? store.name : "Store"}</p>
      </div>
    </div>
  );
};

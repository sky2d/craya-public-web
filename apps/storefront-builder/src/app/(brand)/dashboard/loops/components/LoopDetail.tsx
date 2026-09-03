import { useLoopsContext } from "@/provider/LoopsProvider";
import { useProductContext } from "@/provider/ProductProvider";
import { Drawer } from "antd";
import { Loop, LoopStatus, Presence, SimpleProduct } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2, ImageUpload, showPopup } from "components/src/minor";
import { createLoop, updateLoop } from "components/src/services/api/loops";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LoopDetailProps {
  loop: Loop;
  onClose: () => void;
}

export const LoopDetail: React.FC<LoopDetailProps> = ({ loop, onClose }) => {
  const { selectedLoop, setSelectedLoop, loops, setLoops } = useLoopsContext();
  const [isOpenProductList, setIsOpenProductList] = useState(false);
  const { products } = useProductContext();

  const handleProductClick = (product: SimpleProduct) => {
    const isSelected = selectedLoop.products.some(p => p.id === product.id);

    const updatedProducts = isSelected ? selectedLoop.products.filter(p => p.id !== product.id) : [...selectedLoop.products, product];

    setSelectedLoop({
      ...selectedLoop,
      products: updatedProducts,
    });
  };

  const handleSave = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { products, video, ...restLoopData } = selectedLoop;
      const payload: Record<string, unknown> = {
        ...restLoopData,
        videoId: selectedLoop.video?.id || selectedLoop.videoId,
        products: selectedLoop.products?.map(p => p.id || "") || [],
      };

      if (!payload.videoId) {
        showPopup("error", "Please upload a video first");
        return;
      }

      if (selectedLoop.id) {
        const response = await updateLoop(payload);
        if (response.error) {
          showPopup("error", response.error);
          return;
        }
        if (response.data) {
          setLoops(loops.map(l => (l.id === selectedLoop.id ? response.data! : l)));
          showPopup("success", "Loop updated successfully");
        }
      } else {
        const response = await createLoop(payload);
        if (response.error) {
          showPopup("error", response.error);
          return;
        }
        if (response.data) {
          setLoops([...loops, response.data]);
          showPopup("success", "Loop created successfully");
        }
      }
      onClose();
    } catch {
      showPopup("error", "Failed to save loop");
    }
  };

  useEffect(() => {
    setSelectedLoop(loop);
  }, [loop]);

  return (
    <div className="relative overflow-hidden p-2">
      <Drawer
        open={isOpenProductList}
        onClose={() => setIsOpenProductList(false)}
        title="Tag Products"
        placement="right"
        closable={false}
        getContainer={false}
        maskClosable={true}
        styles={{
          mask: { backgroundColor: "transparent" }, // 👈 replaces deprecated maskStyle
        }}
        footer={[]}
      >
        <div className="grid grid-cols-2 gap-4 overflow-y-auto p-1">
          {products.map(product => {
            const isSelected = selectedLoop.products?.some(p => p.id === product.id) || false;
            return (
              <div
                onClick={() => handleProductClick(product)}
                key={product.id}
                className={`cursor-pointer rounded-lg p-2 transition-all ${isSelected ? "border-2 border-brand-color1" : "border-gray-200 border"}`}
              >
                {isSelected && <div className="mb-1 text-xs font-semibold text-brand-color1">Selected</div>}

                <div className="overflow-hidden rounded-md">
                  <Image src={product.productSKUs![0].images[0].fileUrl} alt={product.name} width={200} height={200} />
                </div>

                <div className="mt-2">
                  <h3 className="truncate text-sm font-medium text-black-dark1">{product.name}</h3>
                  <p className="text-sm font-semibold text-black-dark1">₹{product.price?.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Drawer>
      <div className="flex gap-8">
        {/* Left Side: Image Upload Component */}
        <div className="bg-gray-200 w- aspect-[0.655] h-[50vh] overflow-hidden rounded-lg">
          <ImageUpload
            fileType="video"
            changeImage={video => {
              setSelectedLoop({ ...selectedLoop, video: video, videoId: video.id });
            }}
            image={selectedLoop.video}
          />
        </div>

        {/* Right Side: Form */}
        <div className="flex w-full flex-col space-y-6 lg:w-2/3">
          {/* Description */}
          <div>
            <label className="text-gray-600 mb-2 block font-semibold">Description :</label>
            <textarea
              className="border-gray-200 w-full rounded-xl border bg-white-light5 p-3 text-sm focus:border-brand-color1 focus:outline-none"
              rows={4}
              placeholder="Enter a description for this loop..."
              value={selectedLoop.description || ""}
              onChange={e => setSelectedLoop({ ...selectedLoop, description: e.target.value })}
            />
          </div>

          {/* Where to post */}
          <div>
            <label className="text-gray-600 mb-2 block font-semibold">Where To Post :</label>
            <div className="flex items-center rounded-xl bg-white-light5 p-1">
              <Button2
                label="Feed"
                type={selectedLoop.presence === Presence.FEED ? ButtonType.PRIMARY : ButtonType.DEFAULT}
                className={`${selectedLoop.presence === Presence.FEED ? "" : "border-none bg-white-light5"}`}
                handleClick={() => setSelectedLoop({ ...selectedLoop, presence: Presence.FEED })}
              />

              <Button2
                label="Carousel"
                type={selectedLoop.presence === Presence.CAROUSEL ? ButtonType.PRIMARY : ButtonType.DEFAULT}
                className={`mr-2 ${selectedLoop.presence === Presence.CAROUSEL ? "" : "border-none bg-white-light5"}`}
                handleClick={() => setSelectedLoop({ ...selectedLoop, presence: Presence.CAROUSEL })}
              />
            </div>
          </div>

          {/* Select status */}
          <div>
            <label className="text-gray-600 mb-2 block font-semibold">Select :</label>
            <div className="flex items-center rounded-xl bg-white-light5 p-1">
              <Button2
                label="Active"
                type={selectedLoop.status === LoopStatus.ACTIVE ? ButtonType.PRIMARY : ButtonType.DEFAULT}
                className={`${selectedLoop.status === LoopStatus.ACTIVE ? "" : "border-none bg-white-light5"}`}
                handleClick={() => setSelectedLoop({ ...selectedLoop, status: LoopStatus.ACTIVE })}
              />

              <Button2
                label="Archive"
                type={selectedLoop.status === LoopStatus.ARCHIVE ? ButtonType.PRIMARY : ButtonType.DEFAULT}
                className={`mr-2 ${selectedLoop.status === LoopStatus.ARCHIVE ? "" : "border-none bg-white-light5"}`}
                handleClick={() => setSelectedLoop({ ...selectedLoop, status: LoopStatus.ARCHIVE })}
              />
            </div>
          </div>

          {/* Tag Products */}
          <div>
            <label className="text-gray-600 mb-2 block font-semibold">Tag Products :</label>
            <div className="flex flex-col justify-between space-y-3">
              {selectedLoop.products?.map(product => (
                <label key={product.id} className="flex cursor-pointer items-center">
                  <div
                    className="mr-3 flex h-6 w-6 items-center justify-center rounded-md border-2 border-brand-color1 bg-brand-color1 transition-all"
                    onClick={() => handleProductClick(product)}
                  >
                    <svg className="h-4 w-4 text-white-light4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{product.name}</span>
                </label>
              ))}
              <Button2 label="Tag Product" type={ButtonType.PRIMARY} className="w-1/3" handleClick={() => setIsOpenProductList(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="border-gray-200 mt-8 flex justify-end space-x-4 border-t pt-6">
        <Button2 label="Cancel" type={ButtonType.DEFAULT} handleClick={onClose} />
        <Button2 label="Save" type={ButtonType.PRIMARY} handleClick={handleSave} />
      </div>
    </div>
  );
};

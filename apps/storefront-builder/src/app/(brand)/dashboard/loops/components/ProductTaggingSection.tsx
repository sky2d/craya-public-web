import { Modal } from "antd";
import { Loop } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import { useState } from "react";
import { LoopDetail } from "./LoopDetail";

interface ProductTaggingSectionProps {
  loop: Loop;
}

export const ProductTaggingSection: React.FC<ProductTaggingSectionProps> = ({ loop }) => {
  const [isOpenLoopDetail, setIsOpenLoopDetail] = useState(false);

  return (
    <div className="bg-gray-50 flex w-3/5 flex-col justify-between p-4">
      <Modal title="Loop Upload" open={isOpenLoopDetail} centered onCancel={() => setIsOpenLoopDetail(false)} width={800} footer={[]}>
        <LoopDetail loop={loop} onClose={() => setIsOpenLoopDetail(false)} />
      </Modal>

      <div className="space-y-3">
        <h3 className="text-gray-800 mb-4 text-lg font-medium">Tagged Products</h3>
        {loop.products && loop.products.length > 0 ? (
          loop.products.map(product => {
            const imageUrl = product.image?.fileUrl || product.productSKUs?.[0]?.images?.[0]?.fileUrl;
            return (
              <div key={product.id} className="flex items-center space-x-3">
                {imageUrl ? (
                  <img src={imageUrl} alt={product.name} className="h-6 w-6 flex-shrink-0 rounded object-cover" />
                ) : (
                  <div className="bg-gray-200 h-6 w-6 flex-shrink-0 rounded"></div>
                )}
                <span className="text-gray-600 text-xs">{product.name}</span>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-xs">No products tagged.</p>
        )}
      </div>

      <Button2 label="Edit" type={ButtonType.PRIMARY} handleClick={() => setIsOpenLoopDetail(true)} />
    </div>
  );
};

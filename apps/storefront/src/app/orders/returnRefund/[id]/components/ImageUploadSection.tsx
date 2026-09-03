import { UploadedFile } from "components/src/interfaces";
import { ReturnRefundAction } from "components/src/interfaces/orders";
import { MultipleImageUpload } from "components/src/minor";
import React from "react";

interface ImageUploadSectionProps {
  error?: string | null;
  updateImage: (image: UploadedFile, remove?: boolean) => void;
  selectedAction: ReturnRefundAction;
  images?: UploadedFile[];
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ updateImage, error, selectedAction, images }) => {
  return (
    <div className="bg-gray-100 mb-6 rounded-3xl border-[0.5px] border-[#717171] p-4">
      <p className="text-lg font-semibold">{`Add Product Images ${selectedAction === ReturnRefundAction.EXCHANGE ? "" : "(optional)"}`}</p>
      <hr className="my-1 border-t-[0.5px] border-[#717171]" />
      <div className="text-gray-500 mt-4">
        <MultipleImageUpload changeImage={updateImage} images={images} />
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUploadSection;

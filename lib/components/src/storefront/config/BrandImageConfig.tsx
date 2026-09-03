import { useState } from "react";
import { ImageSizeType, StorefrontComponentConfigProps, UploadedFile } from "../../interfaces";
import { Button, ImageUpload } from "../../minor/";
import { handleAddProductButton } from "../../utils/handleAddProductButton";

export const BrandImageConfig: React.FC<StorefrontComponentConfigProps> = ({ storefrontComponentType, data, setData, onclick, setIndex }) => {
  const [error, setError] = useState<string | null>(null);
  const onSelectImage = (image: UploadedFile | undefined) => {
    if (!image) return;

    setData({
      ...data,
      images: [image],
    });

    setError(null);
  };

  const handleImageSizeChange = (imageSize: ImageSizeType) => {
    setData({ ...data, imageSize });
    if (data.images.length > 0) {
      const removedImage = [...data.images];
      removedImage.pop();
      setData({ ...data, images: removedImage, imageSize });
      setError("Image size changed. Please upload it again.");
    }
  };

  return (
    <div className="p-2">
      <div className="mt-4 flex flex-col gap-2">
        <p className="mb-1 text-brand-color1 heading-5">Image</p>
        <ImageUpload
          imageSize={data.imageSize}
          componentType={storefrontComponentType}
          image={data.images[0]}
          changeImage={onSelectImage}
          className="h-36"
        />
        {error && <p className="text-sm text-state-error-dark">{error}</p>}
        <div className="mt-2 flex items-center justify-center">
          <Button
            handelClick={() => handleImageSizeChange(ImageSizeType.SMALL)}
            label="Small"
            primary={true}
            size="small"
            disabled={ImageSizeType.SMALL === data.imageSize}
            className="rounded-none"
          />
          <Button
            handelClick={() => handleImageSizeChange(ImageSizeType.MEDIUM)}
            label="Medium"
            primary={true}
            size="small"
            disabled={ImageSizeType.MEDIUM === data.imageSize}
            className="rounded-none"
          />
          <Button
            handelClick={() => handleImageSizeChange(ImageSizeType.LARGE)}
            label="Large"
            primary={true}
            size="small"
            disabled={ImageSizeType.LARGE === data.imageSize}
            className="rounded-none"
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Button
            label="Add Products"
            size="small"
            primary
            handelClick={() => handleAddProductButton({ storefrontComponentType, data, setData, onclick, setIndex })}
          />

          <p className="text-brand-color1 body-xs">{data.productsPerImage[0]?.length || "0"} products added to this tag </p>
        </div>
      </div>
    </div>
  );
};

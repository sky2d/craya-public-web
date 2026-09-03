import { StorefrontComponentConfigProps, UploadedFile } from "../../../interfaces";
import { Button, ImageUpload } from "../../../minor";
import { handleAddProductButton } from "../../../utils/handleAddProductButton";

interface ImageForAndroidWebProps extends StorefrontComponentConfigProps {
  Android: boolean;
  images: UploadedFile[];
  count: number;
}

export const ImageForAndroidWeb: React.FC<ImageForAndroidWebProps> = ({
  storefrontComponentType,
  images,
  count,
  data,
  setData,
  onclick,
  setIndex,
  Android,
}) => {
  const onSelectImage = (image: UploadedFile, index: number) => {
    const updatedData = { ...data };

    // Get the appropriate image array and clone it
    const currentImages = Android ? [...(data.imageCarouselImages.android || [])] : [...(data.imageCarouselImages.web || [])];

    currentImages[index] = image;

    // Update the correct field in data
    if (Android) {
      updatedData.imageCarouselImages.android = currentImages;
    } else {
      updatedData.imageCarouselImages.web = currentImages;
    }

    // Apply the updated data
    setData(updatedData);
  };

  return (
    <>
      <div className="p-2">
        <div className="mt-2 grid h-80 grid-cols-2 gap-2 overflow-y-auto rounded-md border-2 border-brand-color1 p-2">
          {Array(count)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="mt-4 flex flex-col gap-2">
                <p className="mb-1 text-brand-color1 heading-5">{`#Image ${index + 1}`}</p>
                <ImageUpload
                  Android={Android ? true : false}
                  imageSize={data.imageSize}
                  componentType={storefrontComponentType}
                  image={images[index]}
                  changeImage={image => onSelectImage(image, index)}
                  className="h-36"
                />
                {Android && (
                  <div>
                    <Button
                      label="Add Products"
                      size="small"
                      className=""
                      primary
                      handelClick={() => handleAddProductButton({ storefrontComponentType, data, setData, onclick, setIndex, index, count })}
                    />
                    <p className="mt-2 text-brand-color1 body-xs">{data.productsPerImage[index]?.length || "0"} products added to this tag</p>
                  </div>
                )}
              </div>
            ))}
        </div>
        <p className="text-center text-brand-color1 body-md-semibold">Images For {Android ? "Android" : "Web"}</p>
      </div>
    </>
  );
};

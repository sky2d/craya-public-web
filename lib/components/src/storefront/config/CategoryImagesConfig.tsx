import { useRef } from "react";
import { StorefrontComponentConfigProps, UploadedFile, UploadedFileStatus } from "../../interfaces";
import { Button, CountButton, ImageUpload, InputField } from "../../minor";
import { handleAddProductButton } from "../../utils/handleAddProductButton";
import { useCount } from "../../utils/setCount";

export const CategoryImagesConfig: React.FC<StorefrontComponentConfigProps> = ({ storefrontComponentType, data, setData, onclick, setIndex }) => {
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);
  const [count, setCount] = useCount(3, data);

  const onSelectImage = (image: UploadedFile, index: number) => {
    const updatedImages = [...data.images]; // Clone the array
    updatedImages[index] = image;
    setData({ ...data, images: updatedImages });
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const updatedTexts = [...data.texts]; // Clone the array
    updatedTexts[index] = e.target.value;
    setData({ ...data, texts: updatedTexts });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleUpClick = () => {
    setCount(prevCount => prevCount + 1);
    let updatedImages = [...data.images];
    if (updatedImages.length === 0) {
      updatedImages = Array(count + 1).fill({
        contentType: "",
        status: UploadedFileStatus.PENDING,
        userId: "",
        fileUrl: "",
        fileName: "",
      });
    } else
      updatedImages = [
        ...data.images,
        {
          contentType: "",
          status: UploadedFileStatus.PENDING,
          userId: "",
          fileUrl: "",
          fileName: "",
        },
      ];

    const updatedTexts = [...data.texts, ""];

    setData({ ...data, images: updatedImages, texts: updatedTexts });
  };

  const handleDownClick = () => {
    setCount(prevCount => prevCount - 1);
    const updatedImages = [...data.images];
    const updatedTexts = [...data.texts];
    const updatedProductsPerImage = [...data.productsPerImage];

    updatedImages.pop();
    updatedTexts.pop();
    updatedProductsPerImage.pop();

    setData({ ...data, images: updatedImages, texts: updatedTexts, productsPerImage: updatedProductsPerImage });
  };

  return (
    <div className="relative p-2">
      <CountButton minValue={3} label="No of Images" count={count} handleDownClick={handleDownClick} handleUpClick={handleUpClick} />
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="mt-4 flex flex-col gap-2">
            <p className="mb-1 text-brand-color1 heading-5">{`Image ${index + 1}`}</p>
            <ImageUpload
              imageSize={data.imageSize}
              componentType={storefrontComponentType}
              image={data.images[index]}
              changeImage={image => onSelectImage(image, index)}
              className="h-36"
            />
            <div className="mt-2 flex items-center">
              <InputField
                onChange={e => onChangeText(e, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                className="h-12 border-white-light2"
                placeholder="Category name"
                value={data.texts[index]}
                ref={(el: HTMLInputElement | HTMLTextAreaElement | null) => {
                  inputRefs.current[index] = el;
                }}
              />
              <Button
                label="Add Products"
                primary
                size="small"
                className="ml-2"
                handelClick={() =>
                  handleAddProductButton({
                    data,
                    setData,
                    onclick,
                    setIndex,
                    index,
                    storefrontComponentType,
                    count,
                  })
                }
              />
            </div>
            <p className="mt-2 text-brand-color1 body-xs">{data.productsPerImage[index]?.length || "0"} products added to this tag</p>
          </div>
        ))}
    </div>
  );
};

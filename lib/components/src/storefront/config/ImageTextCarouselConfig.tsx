import React, { useRef } from "react";
import { StorefrontComponentConfigProps, UploadedFile, UploadedFileStatus } from "../../interfaces";
import { Button, CountButton, ImageUpload, InputField } from "../../minor";
import { handleAddProductButton } from "../../utils/handleAddProductButton";
import { useCount } from "../../utils/setCount";

export const ImageTextCarouselConfig: React.FC<StorefrontComponentConfigProps> = ({ storefrontComponentType, data, setData, onclick, setIndex }) => {
  const textRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]); // Ref array for texts
  const extraTextRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]); // Ref array for extraTexts
  const [count, setCount] = useCount(3, data);

  const onSelectImage = (image: UploadedFile, index: number) => {
    const updatedImages = [...data.images]; // Clone the array
    updatedImages[index] = image;
    setData({ ...data, images: updatedImages });
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: "texts" | "extraTexts") => {
    if (field === "texts") {
      const updatedTexts = [...data.texts];
      updatedTexts[index] = e.target.value;
      setData({ ...data, texts: updatedTexts });
    } else {
      const updatedExtraTexts = [...data.extraTexts];
      updatedExtraTexts[index] = e.target.value;
      setData({ ...data, extraTexts: updatedExtraTexts });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number, field: "texts" | "extraTexts") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "texts") {
        const nextInput = textRefs.current[index + 1] || extraTextRefs.current[index];
        if (nextInput) nextInput.focus();
      } else {
        const nextInput = extraTextRefs.current[index + 1];
        if (nextInput) nextInput.focus();
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
    const updatedExtraTexts = [...data.extraTexts, ""];

    setData({ ...data, images: updatedImages, texts: updatedTexts, extraTexts: updatedExtraTexts });
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
    <div className="p-2">
      <CountButton minValue={3} label="No of Carousels" count={count} handleDownClick={handleDownClick} handleUpClick={handleUpClick} />
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
            <div className="mt-2 flex flex-col items-center gap-2">
              <div className="flex w-full">
                <InputField
                  onChange={e => onChangeText(e, index, "texts")}
                  onKeyDown={e => handleKeyDown(e, index, "texts")}
                  className="border-white-light2"
                  placeholder="Title"
                  value={data.texts[index]}
                  ref={(el: HTMLInputElement | HTMLTextAreaElement | null) => {
                    if (el) {
                      textRefs.current[index] = el;
                    }
                  }}
                />
                <Button
                  label="Add Products"
                  size="small"
                  className="ml-2"
                  primary
                  handelClick={() => handleAddProductButton({ storefrontComponentType, data, setData, onclick, setIndex, index, count })}
                />
              </div>
              <div className="w-full">
                <InputField
                  onChange={e => onChangeText(e, index, "extraTexts")}
                  onKeyDown={e => handleKeyDown(e, index, "extraTexts")}
                  className="border-white-light2"
                  placeholder="Sub text"
                  value={data.extraTexts[index]}
                  ref={(el: HTMLInputElement | HTMLTextAreaElement | null) => {
                    if (el) {
                      extraTextRefs.current[index] = el;
                    }
                  }}
                />
                <p className="mt-2 text-brand-color1 body-xs">{data.productsPerImage[index]?.length || "0"} products added to this tag </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

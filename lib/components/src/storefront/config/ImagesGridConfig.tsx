import Image from "next/image";
import React from "react";
import { StorefrontComponentConfigProps, UploadedFile, UploadedFileStatus } from "../../interfaces";
import { Button, ImageUpload, InputField } from "../../minor";
import Grid1 from "../../StorefrontComponentImages/Image Grid/Config/Grid1/Grid1.png";
import Grid2 from "../../StorefrontComponentImages/Image Grid/Config/Grid2/Grid2.png";
import Grid3 from "../../StorefrontComponentImages/Image Grid/Config/Grid3/Grid3.png";
import { handleAddProductButton } from "../../utils/handleAddProductButton";
import { useCount } from "../../utils/setCount";

const MINIMUM_IMAGES = 2;

export const ImagesGridConfig: React.FC<StorefrontComponentConfigProps> = ({
  storefrontComponentType,
  data,
  setData,
  onclick,
  setIndex,
  isOpenImageGridPreview,
  setIsOpenImageGridPreview,
}) => {
  const [count, setCount] = useCount(MINIMUM_IMAGES, data);

  const onSelectImage = (image: UploadedFile, index: number) => {
    const updatedImages = [...data.images];
    updatedImages[index] = image;

    setData({
      ...data,
      images: updatedImages,
    });
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const updatedTexts = data.texts;
    updatedTexts[index] = e.target.value;
    setData({ ...data, texts: updatedTexts });
  };

  const imageGrids = [
    {
      grid: Grid1,
      noOfImages: 4,
    },
    {
      grid: Grid2,
      noOfImages: 3,
    },
    {
      grid: Grid3,
      noOfImages: 2,
    },
  ];

  const handleImageGridPreview = (index: number) => {
    const updatedImagesLength = imageGrids[index].noOfImages;
    setCount(updatedImagesLength);
    setData({
      ...data,
      images: Array(updatedImagesLength).fill({
        contentType: "",
        status: UploadedFileStatus.PENDING,
        userId: "",
        fileUrl: "",
        fileName: "",
      }),
    });

    setIsOpenImageGridPreview!(false);
  };
  return (
    <div className="p-2">
      {isOpenImageGridPreview ? (
        imageGrids.map((image, index) => (
          <div key={index} onClick={() => handleImageGridPreview(index)} className="mt-8 w-full cursor-pointer">
            <p className="mb-1 text-brand-color1 heading-5">{`Grid Type : ${index + 1}`}</p>
            <Image src={image.grid} alt="grid" draggable={false} />
          </div>
        ))
      ) : (
        <>
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="mb-1 text-brand-color1 heading-5">{`#Image ${index + 1}`}</p>
              <ImageUpload
                imageIndex={index}
                noOfImages={count}
                imageSize={data.imageSize}
                componentType={storefrontComponentType}
                image={data.images[index]}
                changeImage={image => onSelectImage(image, index)}
                className="h-36"
              />
              <div className="flex items-center">
                <InputField
                  onChange={e => onChangeText(e, index)}
                  className="mt-2 border-white-light2"
                  placeholder="Title"
                  value={data.texts[index]}
                />
                <Button
                  label={`Add product` + (data.productsPerImage[index]?.length ? ` (${data.productsPerImage[index]?.length} added)` : ``)}
                  size="small"
                  className="ml-2"
                  primary
                  handelClick={() => handleAddProductButton({ storefrontComponentType, data, setData, onclick, setIndex, index, count })}
                />
              </div>
              <p className="mt-2 text-brand-color1 body-xs">{data.productsPerImage[index]?.length || "0"} products added to this tag </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

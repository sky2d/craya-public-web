import { useEffect, useState } from "react";
import { StorefrontComponentConfigProps, UploadedFileStatus } from "../../interfaces";
import { CountButton } from "../../minor";
import { ImageForAndroidWeb } from "./ImageCarousel/ImageForAndroidWeb";

export const ImageCarouselConfig: React.FC<StorefrontComponentConfigProps> = ({ storefrontComponentType, data, setData, onclick, setIndex }) => {
  const imagesLength = data.imageCarouselImages.web.length;
  const [count, setCount] = useState(() => {
    if (imagesLength >= 1) return imagesLength;
    else return 1;
  });
  useEffect(() => {
    const imgsLength = data.imageCarouselImages.web.length;
    if (!imgsLength || imgsLength < 1) return;
    setCount(imgsLength);
  }, [data.imageCarouselImages.web.length]);

  const handleUpClick = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      return newCount;
    });
    const createImageObject = () => ({
      contentType: "",
      status: UploadedFileStatus.PENDING,
      userId: "",
      fileUrl: "",
      fileName: "",
    });

    // Function to update image arrays
    const updateImages = (images: typeof data.imageCarouselImages.web) =>
      images.length === 0
        ? Array(count + 1)
            .fill(null)
            .map(createImageObject)
        : [...images, createImageObject()];

    // Update the data state
    setData({
      ...data,
      imageCarouselImages: {
        ...data.imageCarouselImages,
        web: updateImages(data.imageCarouselImages.web),
        android: updateImages(data.imageCarouselImages.android),
      },
    });
  };

  // Update both arrays with empty images

  // Update data

  const handleDownClick = () => {
    if (count <= 1) return;
    setCount(prevCount => prevCount - 1);
    const updatedAndroidImages = [...(data.imageCarouselImages.android || [])];
    const updatedWebImages = [...(data.imageCarouselImages.web || [])];

    // Remove the last item safely
    updatedAndroidImages.pop();
    updatedWebImages.pop();

    // Update data
    const updatedData = { ...data };
    updatedData.imageCarouselImages.web = updatedWebImages;
    updatedData.imageCarouselImages.android = updatedAndroidImages;
    setData(updatedData);
  };

  return (
    <div className="p-2">
      <CountButton label="No of Images" count={count} handleDownClick={handleDownClick} handleUpClick={handleUpClick} />
      <ImageForAndroidWeb
        storefrontComponentType={storefrontComponentType}
        data={data}
        setData={setData}
        onclick={onclick}
        setIndex={setIndex}
        Android={true}
        images={data.imageCarouselImages.android}
        count={count}
      />
      <ImageForAndroidWeb
        storefrontComponentType={storefrontComponentType}
        data={data}
        setData={setData}
        onclick={onclick}
        setIndex={setIndex}
        Android={false}
        images={data.imageCarouselImages.web}
        count={count}
      />
    </div>
  );
};

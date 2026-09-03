import { StorefrontComponentConfigProps, UploadedFile } from "../../interfaces";
import { ImageUpload, InputField } from "../../minor/";

export const BrandInfoConfig: React.FC<StorefrontComponentConfigProps> = ({ storefrontComponentType, data, setData }) => {
  const onSelectImage = (image: UploadedFile | undefined) => {
    if (image) setData({ ...data, images: [image] });
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedTexts = [...data.texts];
    updatedTexts[0] = e.target.value;
    setData({ texts: updatedTexts });
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
      </div>
      <InputField
        type="text"
        resizable
        className="mt-2 border-white-light2"
        onChange={handleTextChange}
        placeholder="Something about your store."
        value={data.texts[0]}
      />
    </div>
  );
};

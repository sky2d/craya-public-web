import { ImageSizeType, StorefrontComponentConfigProps } from "../../interfaces";
import { Button, InputField } from "../../minor";

export const HeadingTextConfig: React.FC<StorefrontComponentConfigProps> = ({ data, setData }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedTexts = [...data.texts];
    updatedTexts[0] = e.target.value;
    setData({ texts: updatedTexts });
  };
  return (
    <div className="p-2">
      <div className="mt-4 flex flex-col gap-2">
        <p className="mb-1 text-brand-color1 heading-5">Text</p>
        <InputField className="border-white-light2" onChange={handleTextChange} placeholder="Heading text" value={data.texts[0]} />
        <div className="flex items-center justify-center">
          <Button
            handelClick={() => setData({ imageSize: ImageSizeType.SMALL })}
            label="Small"
            className="rounded-none"
            primary={true}
            size="small"
            disabled={ImageSizeType.SMALL === data.imageSize}
          />
          <Button
            handelClick={() => setData({ imageSize: ImageSizeType.MEDIUM })}
            label="Medium"
            className="rounded-none"
            primary={true}
            size="small"
            disabled={ImageSizeType.MEDIUM === data.imageSize}
          />
          <Button
            handelClick={() => setData({ imageSize: ImageSizeType.LARGE })}
            label="Large"
            className="rounded-none"
            primary={true}
            size="small"
            disabled={ImageSizeType.LARGE === data.imageSize}
          />
        </div>
      </div>
    </div>
  );
};

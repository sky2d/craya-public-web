"use client";

import { Label } from "@/components/homeScreen/sellers/components/Label";
import { ButtonType } from "components/src/interfaces/Buttons";
import { InputFieldType } from "components/src/interfaces/InputField";
import { Button2, InputField2, showPopup } from "components/src/minor";
import { RxCross2 } from "react-icons/rx";

type Props = {
  seoTags: string;
  setSeoTags: (value: string) => void;
  storeTags: string[];
  setStoreTags: (tags: string[]) => void;
  error?: string;
};

const StoreTagsSection = ({ seoTags, setSeoTags, storeTags, setStoreTags, error }: Props) => {
  const MAX_TAGS = 8;

  const handleAddTag = () => {
    if (!seoTags.trim()) return;

    if (storeTags.length >= MAX_TAGS) {
      showPopup("error", "You can only add up to 8 tags");
      return;
    }

    setStoreTags([...storeTags, seoTags.trim()]);
    setSeoTags("");
  };

  const handleRemoveTag = (index: number) => {
    setStoreTags(storeTags.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="w-full p-1">
        <Label>Category Tags</Label>
        <div className="flex w-full justify-center gap-2">
          <InputField2
            className="w-4/5"
            type={InputFieldType.TEXT}
            dataIndex={3}
            placeholder="SEO Tags"
            value={seoTags}
            onChange={e => setSeoTags(e.target.value)}
            errorMessage={error}
            onSubmit={handleAddTag}
          />
          <div className="w-2/5">
            <Button2
              type={ButtonType.PRIMARY}
              className="border bg-brand-color1 text-xs text-white-light4"
              label="Add Tags"
              handleClick={handleAddTag}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-4 py-3">
        {storeTags.map((tag, index) => (
          <div
            key={index}
            className="relative inline-flex items-center justify-center gap-2 rounded-full bg-brand-color1 py-1 pl-4 pr-1 font-normal text-white-light4 sm:text-[10px] xl:text-[0.7vw]"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(index)}
              className="ml-1 flex aspect-square w-4 cursor-pointer items-center justify-center rounded-full bg-white-light4 text-xs leading-none text-black-dark1"
            >
              <RxCross2 />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default StoreTagsSection;

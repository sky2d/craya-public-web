import { useEffect, useRef, useState } from "react";
import { StorefrontComponentConfigProps } from "../../interfaces";
import { Button, CountButton, InputField } from "../../minor";
import { handleAddProductButton } from "../../utils/handleAddProductButton";

export const TextCarouselConfig: React.FC<StorefrontComponentConfigProps> = ({ storefrontComponentType, data, setData, onclick, setIndex }) => {
  const [count, setCount] = useState(() => {
    if (data.texts?.length >= 3) {
      return data.texts?.length;
    } else return 3;
  });

  useEffect(() => {
    const imagesLength = data.texts?.length;
    if (!imagesLength || imagesLength < 3) return;
    if (imagesLength > 3) setCount(imagesLength);
  }, [data.texts?.length]);

  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]); // Updated type

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const updatedTexts = [...data.texts];
    updatedTexts[index] = e.target.value;

    const updatedData = {
      ...data,
      texts: updatedTexts,
    };

    setData(updatedData);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission behavior
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleUpClick = () => {
    setCount(prevCount => prevCount + 1);
    let updatedTexts = [...data.texts];
    if (updatedTexts.length === 0) {
      updatedTexts = Array(count + 1).fill("");
    } else updatedTexts = [...data.texts, ""];

    setData({ ...data, texts: updatedTexts });
  };

  const handleDownClick = () => {
    setCount(prevCount => prevCount - 1);
    const updatedTexts = [...data.texts];
    updatedTexts.pop();
    setData({ ...data, texts: updatedTexts });
  };

  return (
    <div className="p-2">
      <CountButton minValue={3} label="No of Text" count={count} handleDownClick={handleDownClick} handleUpClick={handleUpClick} />
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="mt-4 flex flex-col justify-between">
            <p className="text-brand-color1 heading-5">{`Text ${index + 1}`}</p>
            <div className="flex items-center">
              <InputField
                className="border-white-light2"
                placeholder="Type something"
                value={data.texts[index]}
                onChange={e => onChangeText(e, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                ref={(el: HTMLInputElement | HTMLTextAreaElement | null) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <Button
                label="Add Products"
                size="small"
                primary
                handelClick={() => handleAddProductButton({ storefrontComponentType, data, setData, onclick, setIndex, index, count })}
              />

              <p className="text-brand-color1 body-xs">{data.productsPerImage[index]?.length || "0"} products added to this tag </p>
            </div>
          </div>
        ))}
    </div>
  );
};

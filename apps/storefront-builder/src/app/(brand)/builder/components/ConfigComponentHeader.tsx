import { useBuilderContext } from "@/provider/BuilderProvider";
import { convertToPascalCase } from "@/utils/text";
import { RxCross2 } from "react-icons/rx";

const ConfigComponentHeader = () => {
  const { newStorefrontComponent, setIsOpenComponentList, setIsOpenImageGridPreview, setNewStorefrontComponent } = useBuilderContext();
  const handleCrossClick = () => {
    setNewStorefrontComponent(null);
    setIsOpenImageGridPreview(true);
    setIsOpenComponentList(false);
  };

  return (
    <div className="relative bg-white-light4">
      <p className="text-center text-brand-color1 body-lg-semibold">{convertToPascalCase(newStorefrontComponent.type)}</p>
      <button onClick={handleCrossClick} className="absolute right-0 top-0 cursor-pointer p-1 text-white-light4">
        <RxCross2 className="text-3xl font-bold text-brand-color1" />
      </button>
    </div>
  );
};

export default ConfigComponentHeader;

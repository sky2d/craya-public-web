import { convertToPascalCase } from "@/utils/text";
import { builderComponentMapping } from "components/src/constant/storefront";
import { StorefrontComponentType } from "components/src/interfaces";
import Image from "next/image";

export const DraggedItem: React.FC<{ type: StorefrontComponentType }> = ({ type }) => {
  const Component = builderComponentMapping.get(type);
  if (!Component) return null;

  return (
    <div className="w-full cursor-pointer">
      <div className="heading border-b border-brand-color1 py-2 text-center text-brand-color1 body-normal-semibold">{convertToPascalCase(type)}</div>
      <div className="relative">
        <Image src={Component.componentImage} alt="component" />
      </div>
    </div>
  );
};

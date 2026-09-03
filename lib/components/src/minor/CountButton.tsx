import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IconButton } from "./IconButton";

type CountButtonProps = {
  label: string;
  count: number;
  minValue?: number;
  isUpDisabled?: boolean;
  isDownDisabled?: boolean;
  handleUpClick?: () => void;
  handleDownClick?: () => void;
};

export const CountButton: React.FC<CountButtonProps> = ({
  label,
  count,
  isUpDisabled,
  isDownDisabled,
  handleUpClick,
  handleDownClick,
  minValue = 1,
}) => {
  isDownDisabled = isDownDisabled || count <= minValue;

  return (
    <div className="sticky top-0 z-50 flex flex-col bg-white-light4">
      <p className="text-brand-color1 heading-5">{label}</p>
      <div className="flex h-[51px] w-[156px]">
        <div className="flex w-10/12 items-center justify-between rounded-xl border-4 border-brand-color1 p-2 text-brand-color1">
          <IconButton disabled={isDownDisabled} iconStyle="text-4xl font-bold" onClick={handleDownClick} icon={IoIosArrowDown} />
          <span className="body-lg-semibold">{count}</span>
          <IconButton disabled={isUpDisabled} iconStyle="text-4xl font-bold" onClick={handleUpClick} icon={IoIosArrowUp} />
        </div>
      </div>
    </div>
  );
};

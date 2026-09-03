import { TiPlus } from "react-icons/ti";

type AddCardsProps = {
  onclick: () => void;
  className?: string;
  IconColor: string;
};

const AddCards: React.FC<AddCardsProps> = ({ onclick, className, IconColor }) => {
  return (
    <div className={`flex ${className} cursor-pointer items-center justify-center rounded-2xl`} onClick={onclick}>
      <TiPlus color={IconColor} className="animate-bounce text-[80px]" />
    </div>
  );
};

export default AddCards;

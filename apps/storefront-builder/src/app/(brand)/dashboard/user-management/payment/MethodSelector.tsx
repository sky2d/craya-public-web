import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";

export const MethodSelector = ({ onSelectBank, onSelectUpi }: { onSelectBank: () => void; onSelectUpi: () => void }) => (
  <div className="flex h-full flex-col items-center justify-center">
    <h2 className="text-gray-800 mb-6 text-xl font-semibold">What do you want to Connect?</h2>
    <div className="flex items-center gap-4">
      <Button2 label="Bank account" className="!w-auto" type={ButtonType.PRIMARY} handleClick={onSelectBank} />
      <span className="text-gray-400 font-medium">or</span>
      <Button2 label="UPI" className="!w-auto" type={ButtonType.PRIMARY} handleClick={onSelectUpi} />
    </div>
  </div>
);

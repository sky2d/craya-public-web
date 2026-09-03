import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";

export const InitialPrompt = ({ onAddAccount }: { onAddAccount: () => void }) => (
  <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
    <h2 className="max-w-[50%] text-[clamp(17px,1.2vw,21px)] font-semibold">Link your bank account to receive payouts from your sales 💸💸</h2>
    <p className="text-[clamp(14px,1vw,17px)]">Safe, secure, and super easy!</p>
    <Button2 label="Add Account" className="!w-auto" type={ButtonType.PRIMARY} handleClick={onAddAccount} />
  </div>
);

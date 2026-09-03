import { ReturnRefundAction } from "components/src/interfaces/orders";
import React from "react";

// --- Constants & Types ---
const ACTION_OPTIONS = [
  // { id: ReturnRefundAction.RETURN, label: "Return/Refund" },
  { id: ReturnRefundAction.EXCHANGE, label: "Exchange" },
] as const;

export type ActionType = (typeof ACTION_OPTIONS)[number]["id"];

interface ActionSelectorProps {
  selectedAction: ActionType;
  onActionChange: (action: ActionType) => void;
}

// --- Component ---
const ActionSelector: React.FC<ActionSelectorProps> = ({ selectedAction, onActionChange }) => {
  return (
    <div className="mb-10">
      <h2 className="mb-2 text-lg font-semibold">What do you want?</h2>
      <div className="flex flex-wrap gap-4">
        {ACTION_OPTIONS.map(option => (
          <div
            key={option.id}
            className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-2 transition-colors sm:w-auto sm:max-w-[25%] ${
              // Adjusted width for flexibility
              selectedAction === option.id
                ? "border-purple-600 text-purple-600 ring-1 ring-purple-600"
                : "border-gray-300 text-gray-500 hover:border-gray-400"
            }`}
            onClick={() => onActionChange(option.id)}
            role="radio"
            aria-checked={selectedAction === option.id}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === " " || e.key === "Enter") onActionChange(option.id);
            }}
          >
            {/* Custom Radio Button Visual */}
            <div
              className={`mr-3 flex aspect-square h-6 w-6 items-center justify-center rounded-full transition-colors ${
                selectedAction === option.id ? "bg-brand-color1" : "bg-[#888282]"
              }`}
            >
              {selectedAction === option.id && <div className="aspect-square h-3 w-3 rounded-full bg-white-light4"></div>}
            </div>
            <p className="text-sm font-semibold">{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionSelector;

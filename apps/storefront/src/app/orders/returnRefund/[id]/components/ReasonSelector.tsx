import { TextAreaField } from "components/src/minor"; // Adjust path as needed
import React from "react";

// --- Constants & Types ---
const RETURN_REASONS = [
  { id: "unsatisfactory", label: "The product quality is unsatisfactory." },
  { id: "non-functional", label: "I need to return a non-functional, unsealed product." },
  { id: "changed-mind", label: "I changed my mind or the product was not as expected." },
  { id: "misleading", label: "The product information was misleading." },
  { id: "others", label: "Others" },
] as const;

export type ReasonType = (typeof RETURN_REASONS)[number]["label"];

interface ReasonSelectorProps {
  selectedReason: ReasonType;
  description: string;
  error?: string;
  onReasonChange: (reason: ReasonType) => void;
  onDescriptionChange: (description: string) => void;
}

// --- Component ---
const ReasonSelector: React.FC<ReasonSelectorProps> = ({ selectedReason, onReasonChange, description, onDescriptionChange, error }) => {
  return (
    <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:gap-10">
      {/* Reason Radio Buttons */}
      <div className="flex w-full flex-col">
        <h2 className="mb-2 text-lg font-semibold">What is the primary reason?</h2>
        <div className="space-y-2">
          {RETURN_REASONS.map(reasonOption => (
            <label key={reasonOption.id} className="flex cursor-pointer items-center space-x-2">
              <input
                type="radio"
                name="reason"
                value={reasonOption.id}
                checked={selectedReason === reasonOption.label}
                onChange={e => {
                  const selectedId = e.target.value;
                  const selectedLabel = RETURN_REASONS.find(r => r.id === selectedId)?.label ?? "";
                  onReasonChange(selectedLabel as ReasonType);
                }}
                className="h-4 w-4 cursor-pointer accent-brand-color1"
              />
              <span className="text-sm">{reasonOption.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reason Description Text Area */}
      <div className="flex w-full flex-col">
        <h2 className="mb-2 text-lg font-semibold">Please provide more details {`${selectedReason === "Others" ? "" : "(optional)"}`}</h2>
        <TextAreaField placeholder="Write your reason here..." value={description} onChange={e => onDescriptionChange(e.target.value)} />
        <span className="text-red-500">{error}</span>
      </div>
    </div>
  );
};

export default ReasonSelector;

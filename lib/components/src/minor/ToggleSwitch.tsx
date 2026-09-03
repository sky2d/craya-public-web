interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, setEnabled }) => {
  return (
    <label htmlFor="unique-toggle-id" className="flex cursor-pointer items-center">
      <div className="relative">
        <input id="unique-toggle-id" type="checkbox" className="sr-only" checked={enabled} onChange={() => setEnabled(!enabled)} />
        {/* The background track */}
        <div
          className={`block h-6 w-11 rounded-full transition-colors ${enabled ? "bg-brand-color1" : "border border-brand-color1 bg-white-light4"}`}
        ></div>
        {/* The sliding dot */}
        <div
          className={`dot absolute left-1 top-1 h-4 w-4 rounded-full transition-transform ${
            enabled ? "translate-x-full bg-white-light4" : "bg-brand-color1"
          }`}
        ></div>
      </div>
    </label>
  );
};

const SegmentedControl = ({ options, value, onChange }) => {
  return (
    <div className="inline-flex items-center rounded-lg bg-[#F3F3F3] p-1">
      {options.map(option => {
        const isActive = value === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-md px-4 py-2 text-[clamp(12px,0.8vw,15px)] font-normal transition-colors duration-300 ease-in-out focus:outline-none ${
              isActive ? "font bg-[#ffffff] shadow-sm" : ""
            } `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;

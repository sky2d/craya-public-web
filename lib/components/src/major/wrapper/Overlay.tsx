type OverlayProps = {
  isOpen: boolean;
  handleClickOutside: () => void;
};

export const Overlay: React.FC<OverlayProps> = ({ isOpen, handleClickOutside }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed right-0 top-0 z-40 h-full w-full bg-black-dark1 opacity-50 transition-opacity duration-300 ease-in-out"
      onClick={handleClickOutside}
    />
  );
};

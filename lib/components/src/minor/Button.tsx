interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  compress?: boolean;
  custom?: boolean;
  onKeydown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  handelClick?: ((event: React.FormEvent) => void) | (() => Promise<void>);
  onLeftIconClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onRightIconClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  secondary = false,
  disabled = false,
  size = "medium",
  backgroundColor,
  label,
  leftIcon,
  rightIcon,
  className,
  custom,
  onKeydown,
  handelClick,
  compress,
  onLeftIconClick,
  onRightIconClick,
  ...props
}) => {
  let sizeClasses;
  let iconSizeClasses;

  switch (size) {
    case "small":
      sizeClasses = `${compress ? "" : "px-3 py-2"}  text-xs`;
      iconSizeClasses = "w-3.5 h-3.5";
      break;
    case "medium":
      sizeClasses = "px-4 py-3 text-base";
      iconSizeClasses = "w-3.5 h-3.5";
      break;
    case "large":
      sizeClasses = "px-6 py-4 text-lg";
      iconSizeClasses = "w-4.5 h-4.5";
      break;
    default:
      sizeClasses = "px-4 py-3 text-base";
      iconSizeClasses = "w-3.5 h-3.5";
  }

  const baseClasses = `inline-flex items-center justify-center ${custom ? " " : "rounded-lg"}  ${sizeClasses} ${className}`;
  let buttonClasses;

  if (primary) {
    buttonClasses = `${baseClasses} bg-brand-color1 text-white-light4 border-none transition duration-200 ease-in-out hover:bg-[#B2B7F1]`;
  } else if (secondary) {
    buttonClasses = `${baseClasses} ${backgroundColor ? "" : "bg-white-light3"} text-black-dark1 border border-transparent`;
  } else if (custom) {
    buttonClasses = `${className} transition duration-200 ease-in-out  hover:bg-[#B2B7F1] hover:text-white-light4 border-none px-4 py-3 text-base rounded-lg  text-brand-color1 border border-brand-color1`;
  } else {
    buttonClasses = `${baseClasses} bg-transparent text-brand-color1 border border-brand-color1`;
  }

  if (disabled) {
    buttonClasses = `${buttonClasses} text-gray-800 opacity-40 cursor-not-allowed`;
  }

  return (
    <button
      onKeyDown={onKeydown}
      type="button"
      className={buttonClasses}
      onClick={disabled ? undefined : handelClick}
      disabled={disabled}
      style={{
        backgroundColor: secondary && backgroundColor ? backgroundColor : undefined,
      }}
      {...props}
    >
      {leftIcon && (
        <span className={`mr-4 ${iconSizeClasses} flex items-center`} onClick={onLeftIconClick}>
          {leftIcon}
        </span>
      )}
      {label}
      {rightIcon && (
        <span className={`ml-4 ${iconSizeClasses} flex items-center`} onClick={onRightIconClick}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

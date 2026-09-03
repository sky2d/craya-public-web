import { IconBaseProps } from "react-icons";
import { COLORS } from "../constant/colors";

type IconButtonProps = {
  buttonStyle?: string;
  iconStyle?: string;
  disabled?: boolean;
  iconColor?: string;
  size?: number;
  iconComponent?: React.ReactNode;
  icon?: React.FC<IconBaseProps>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const IconButton: React.FC<IconButtonProps> = props => {
  if (!props.icon && !props.iconComponent) return <div>No Icon</div>;

  return (
    <div className={props.buttonStyle}>
      <button suppressHydrationWarning={true} onClick={props.disabled ? () => null : props.onClick}>
        {props.icon ? (
          <props.icon size={props.size} color={props.disabled ? COLORS.gray : props.iconColor ? props.iconColor : ""} className={props.iconStyle} />
        ) : (
          props.iconComponent
        )}
      </button>
    </div>
  );
};

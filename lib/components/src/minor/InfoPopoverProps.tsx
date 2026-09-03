import { Popover } from "antd";
import React from "react";
import { PopoverPlacement } from "../interfaces";

interface InfoPopoverProps {
  infoText: string | React.ReactNode;
  placement?: PopoverPlacement;
  children?: React.ReactNode;
}

export const InfoPopover: React.FC<InfoPopoverProps> = ({ infoText, placement, children }) => {
  return (
    <Popover placement={placement || PopoverPlacement.TopLeft} content={infoText}>
      {children}
    </Popover>
  );
};

import { Modal } from "antd";
import { FC, ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: object;
  className?: string;
  footer?: ReactNode;
  padding?: string;
  borderRadius?: string;
}

export const BaseModal: FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  borderRadius,
  className = "",
  footer = null,
  width,
  padding = "20px 24px",
}) => {
  return (
    <Modal
      open={isOpen}
      centered
      onCancel={onClose}
      footer={footer}
      width={width}
      title={title}
      className={className}
      style={{ height: "auto", maxHeight: "90vh", borderRadius: borderRadius || "8px" }}
      styles={{
        content: { padding: padding, borderRadius: borderRadius || "8px" },
      }}
    >
      {children}
    </Modal>
  );
};

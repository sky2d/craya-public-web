import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "../../minor";

const meta: Meta<typeof InputField> = {
  title: "Example/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: { control: { type: "select", options: ["text", "number", "email", "password"] } },
    onChange: { action: "changed" },
    value: { control: "text" },
    resizable: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    errorMessage: { control: "text" },
  },
  args: { iconClickHandler: () => console.log("Icon clicked") },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    value: "",
    resizable: false,
    error: false,
    disabled: false,
    width: "540px",
  },
};

export const NumberInput: Story = {
  args: {
    type: "number",
    placeholder: "Enter number...",
    value: "",
    resizable: false,
    error: false,
    disabled: false,
    width: "540px",
    borderRadius: "20px",
  },
};

export const EmailInput: Story = {
  args: {
    type: "email",
    placeholder: "Enter email...",
    value: "",
    resizable: false,
    error: false,
    disabled: false,
    width: "640px",
    iconPosition: "right",
    borderRadius: "20px",
    height: "62px",
  },
};

export const PasswordInput: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    value: "",
    resizable: false,
    error: false,
    disabled: false,
    width: "540px",
    height: "62px",
  },
};

export const ResizableBox: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    value: "",
    resizable: true,
    error: false,
    disabled: false,
    width: "540px",
  },
};

export const ErrorState: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    value: "",
    resizable: false,
    error: true,
    disabled: false,
    errorMessage: "Empty text",
    width: "540px",
    className: "h-12",
  },
};

export const DisabledState: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    value: "",
    resizable: false,
    error: false,
    disabled: true,
    width: "540px",
  },
};

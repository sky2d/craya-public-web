import type { Meta, StoryObj } from "@storybook/react";
import { Popups } from "../../minor";

const meta: Meta<typeof Popups> = {
  component: Popups,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SuccessPopup: Story = {
  args: {
    type: "success",
    message: "Success",
  },
};

export const WarningPopup: Story = {
  args: {
    type: "warning",
    message: "Warning",
  },
};

export const ErrorPopup: Story = {
  args: {
    type: "error",
    message: "Error",
  },
};

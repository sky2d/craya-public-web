import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../minor";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: { handelClick: () => console.log("Button clicked") },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallPrimary: Story = {
  args: {
    primary: true,
    size: "small",
    label: "Small Primary",
  },
};

export const SmallSecondary: Story = {
  args: {
    secondary: true,
    size: "small",
    label: "Small Secondary",
  },
};

export const SmallOutline: Story = {
  args: {
    size: "small",
    label: "Small Outline",
  },
};

export const MediumPrimary: Story = {
  args: {
    primary: true,
    size: "medium",
    label: "Medium Primary",
  },
};

export const MediumSecondary: Story = {
  args: {
    secondary: true,
    size: "medium",
    label: "Medium Secondary",
  },
};

export const MediumOutline: Story = {
  args: {
    size: "medium",
    label: "Medium Outline",
  },
};

export const LargePrimary: Story = {
  args: {
    primary: true,
    size: "large",
    label: "Large Primary",
  },
};

export const LargeSecondary: Story = {
  args: {
    secondary: true,
    size: "large",
    label: "Large Secondary",
  },
};

export const LargeOutline: Story = {
  args: {
    size: "large",
    label: "Large Outline",
  },
};

export const DisabledPrimary: Story = {
  args: {
    primary: true,
    disabled: true,
    size: "medium",
    label: "Disabled Primary",
  },
};

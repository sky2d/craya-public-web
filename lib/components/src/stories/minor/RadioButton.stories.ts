import { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "../../minor";

const meta: Meta<typeof RadioButton> = {
  title: "Example/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveUnchecked: Story = {
  args: {
    checked: false,
  },
};

export const ActiveChecked: Story = {
  args: {
    checked: true,
  },
};

export const Labelled: Story = {
  args: {
    checked: true,
    label: "Labelled Radio Button",
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

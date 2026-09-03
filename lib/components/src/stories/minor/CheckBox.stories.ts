import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckBox } from "../../minor";

const meta: Meta<typeof CheckBox> = {
  title: "Example/CheckBox",
  component: CheckBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    onChange: action("changed"),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveChecked: Story = {
  args: {
    checked: true,
    label: "",
  },
};

export const ActiveUnchecked: Story = {
  args: {
    checked: false,
    label: "",
  },
};

export const Labelled: Story = {
  args: {
    checked: false,
    label: "CheckBox Label",
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    label: "",
    disabled: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    checked: false,
    label: "",
    disabled: true,
  },
};

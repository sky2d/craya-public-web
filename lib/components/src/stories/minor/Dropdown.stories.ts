import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "../../minor";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text", description: "Label for the dropdown" },
    options: { control: "object", description: "List of dropdown options" },
    defaultOption: { control: "text", description: "Default selected option" },
    className: { control: "text", description: "Custom class for styling" },
    onSelect: { action: "selected", description: "Callback when an option is selected" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Select a color",
    options: ["Red", "Blue", "Green"],
    defaultOption: "Red",
  },
};

export const CustomLabel: Story = {
  args: {
    label: "Pick a fruit",
    options: ["Apple", "Banana", "Orange", "Grapes"],
    defaultOption: "Banana",
  },
};

export const StyledDropdown: Story = {
  args: {
    label: "Select a theme",
    options: ["Light", "Dark", "Solarized"],
    className: "bg-blue-100",
    defaultOption: "Light",
  },
};

export const WithoutDefaultOption: Story = {
  args: {
    label: "Choose a color",
    options: ["Red", "Blue", "Green"],
  },
};

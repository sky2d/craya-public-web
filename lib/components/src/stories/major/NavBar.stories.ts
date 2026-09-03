import type { Meta, StoryObj } from "@storybook/react";

import { NavBar } from "../../major";

const meta: Meta<typeof NavBar> = {
  component: NavBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onHamburgerClick: { action: "clicked" },
    onSearchClick: { action: "clicked" },
    onHeartClick: { action: "clicked" },
    onCartClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

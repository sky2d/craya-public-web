import type { Meta, StoryObj } from "@storybook/react";

import { CountButton } from "../../minor";

const meta = {
  component: CountButton,
} satisfies Meta<typeof CountButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "No of Carousels",
    handleUpClick: () => {},
    handleDownClick: () => {},
    count: 1,
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { ShoppableCarousel } from "../../storefront/main";

const meta = {
  component: ShoppableCarousel,
} satisfies Meta<typeof ShoppableCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

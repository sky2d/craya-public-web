import type { Meta, StoryObj } from "@storybook/react";

import { TextCarousel } from "../../storefront/main";

const meta = {
  component: TextCarousel,
} satisfies Meta<typeof TextCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

import type { Meta, StoryObj } from "@storybook/react";

import { ImageCarousel } from "../../storefront/main";

const meta = {
  component: ImageCarousel,
} satisfies Meta<typeof ImageCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

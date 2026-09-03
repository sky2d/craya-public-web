import type { Meta, StoryObj } from "@storybook/react";

import { ImageTextCarousel } from "../../storefront/main";

const meta = {
  component: ImageTextCarousel,
} satisfies Meta<typeof ImageTextCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

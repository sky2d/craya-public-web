import type { Meta, StoryObj } from "@storybook/react";

import { Coupons } from "../../storefront/main";

const meta = {
  component: Coupons,
} satisfies Meta<typeof Coupons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

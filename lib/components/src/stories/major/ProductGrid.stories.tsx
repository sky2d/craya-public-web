import type { Meta, StoryObj } from "@storybook/react";

import { ProductGrid } from "../../storefront/main";

const meta = {
  component: ProductGrid,
} satisfies Meta<typeof ProductGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

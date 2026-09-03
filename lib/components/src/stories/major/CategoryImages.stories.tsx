import type { Meta, StoryObj } from "@storybook/react";

import { CategoryImages } from "../../storefront/main";

const meta = {
  component: CategoryImages,
} satisfies Meta<typeof CategoryImages>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

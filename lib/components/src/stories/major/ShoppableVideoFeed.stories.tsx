import type { Meta, StoryObj } from "@storybook/react";

import { ShoppableVideoFeed } from "../../storefront/main";

const meta = {
  component: ShoppableVideoFeed,
} satisfies Meta<typeof ShoppableVideoFeed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

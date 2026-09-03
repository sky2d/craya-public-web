import type { Meta, StoryObj } from "@storybook/react";

import { ImageButton } from "../../storefront/main";

const meta = {
  component: ImageButton,
} satisfies Meta<typeof ImageButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

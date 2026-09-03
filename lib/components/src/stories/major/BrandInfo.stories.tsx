import type { Meta, StoryObj } from "@storybook/react";

import { BRAND_INFO_PREVIEW_DATA } from "../../storefront/data";
import { BrandInfo } from "../../storefront/main";

const meta = {
  component: BrandInfo,
} satisfies Meta<typeof BrandInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: BRAND_INFO_PREVIEW_DATA },
};

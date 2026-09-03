import type { Meta, StoryObj } from "@storybook/react";

import { ImageSizeType } from "../../interfaces";
import { BRAND_IMAGE_PREVIEW_DATA } from "../../storefront/data";
import { BrandImage } from "../../storefront/main";

const meta = {
  component: BrandImage,
} satisfies Meta<typeof BrandImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BrandImageSmall: Story = {
  args: {
    data: { ...BRAND_IMAGE_PREVIEW_DATA, imageSize: ImageSizeType.SMALL },
  },
};
export const BrandImageMedium: Story = {
  args: {
    data: { ...BRAND_IMAGE_PREVIEW_DATA, imageSize: ImageSizeType.MEDIUM },
  },
};
export const BrandImageLarge: Story = {
  args: {
    data: { ...BRAND_IMAGE_PREVIEW_DATA, imageSize: ImageSizeType.LARGE },
  },
};

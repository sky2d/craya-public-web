import type { Meta, StoryObj } from "@storybook/react";

import { ImageSizeType } from "../../interfaces";
import { HEADING_TEXT_PREVIEW_DATA } from "../../storefront/data";
import { HeadingText } from "../../storefront/main";

const meta = {
  component: HeadingText,
} satisfies Meta<typeof HeadingText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeadingTextSmall: Story = {
  args: {
    data: { ...HEADING_TEXT_PREVIEW_DATA, imageSize: ImageSizeType.SMALL },
  },
};
export const HeadingTextLarge: Story = {
  args: {
    data: { ...HEADING_TEXT_PREVIEW_DATA, imageSize: ImageSizeType.LARGE },
  },
};

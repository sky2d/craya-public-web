import type { Meta, StoryObj } from "@storybook/react";

import { createStorefrontData, createUploadedFileData } from "../../services/storefront";
import { ImagesGrid } from "../../storefront/main";

const meta = {
  component: ImagesGrid,
} satisfies Meta<typeof ImagesGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ImagesGrid1: Story = {
  args: {
    data: createStorefrontData({ images: Array(2).fill(createUploadedFileData("https://placehold.jp/1400x1400.png")) }),
  },
};
export const ImagesGrid2: Story = {
  args: {
    data: createStorefrontData({ images: Array(3).fill(createUploadedFileData("https://placehold.jp/1400x1400.png")) }),
  },
};
export const ImagesGrid3: Story = {
  args: {
    data: createStorefrontData({ images: Array(3).fill(createUploadedFileData("https://placehold.jp/1400x1400.png")) }),
  },
};
export const ImagesGrid4: Story = {
  args: {
    data: createStorefrontData({ images: Array(4).fill(createUploadedFileData("https://placehold.jp/1400x1400.png")) }),
  },
};

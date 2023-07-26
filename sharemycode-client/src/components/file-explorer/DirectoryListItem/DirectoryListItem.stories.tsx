import type { Meta, StoryObj } from "@storybook/react";

import { DirectoryListItem } from "../DirectoryListItem";

const meta: Meta<typeof DirectoryListItem> = {
  component: DirectoryListItem,
};

export default meta;

type Story = StoryObj<typeof DirectoryListItem>;

export const Default: Story = {
  render: () => <DirectoryListItem />,
};

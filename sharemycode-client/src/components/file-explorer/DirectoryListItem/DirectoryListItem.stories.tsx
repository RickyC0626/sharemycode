import type { Meta, StoryObj } from "@storybook/react";

import { DirectoryListItem } from "../DirectoryListItem";
import { FaFile, FaFolder } from "react-icons/fa";
import { PiCaretRightBold } from "react-icons/pi";

const meta: Meta<typeof DirectoryListItem> = {
  component: DirectoryListItem,
};

export default meta;

type Story = StoryObj<typeof DirectoryListItem>;

export const Default: Story = {
  render: () => <DirectoryListItem label="Default" />,
};

export const Directory: Story = {
  render: () => (
    <DirectoryListItem
      label="Directory"
      iconBefore={FaFolder}
      iconAfter={PiCaretRightBold}
    />
  )
};

export const File: Story = {
  render: () => (
    <DirectoryListItem
      label="My File"
      iconBefore={FaFile}
    />
  )
};

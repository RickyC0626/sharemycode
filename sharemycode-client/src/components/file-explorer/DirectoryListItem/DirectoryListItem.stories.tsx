import type { Meta, StoryObj } from "@storybook/react";

import { DirectoryListItem } from "../DirectoryListItem";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa";
import { PiCaretRightBold } from "react-icons/pi";

const meta: Meta<typeof DirectoryListItem> = {
  title: "File Explorer/Directory List Item",
  component: DirectoryListItem,
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "boolean",
    },
    iconBefore: {
      table: {
        disable: true,
      },
    },
    iconAfter: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DirectoryListItem>;

export const Default: Story = {
  args: {
    label: "Default",
  },
};

export const Directory: Story = {
  args: {
    label: "Directory",
    iconBefore: FaFolder,
    iconAfter: PiCaretRightBold,
  },
};

export const ActiveDirectory: Story = {
  args: {
    label: "Directory",
    active: true,
    iconBefore: FaFolderOpen,
    iconAfter: PiCaretRightBold,
  },
};

export const File: Story = {
  args: {
    label: "My File",
    iconBefore: FaFile,
  },
};

export const ActiveFile: Story = {
  args: {
    label: "My File",
    active: true,
    iconBefore: FaFile,
  },
};

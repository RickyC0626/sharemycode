import type { Meta, StoryObj } from "@storybook/react";
import { DirectoryList } from "./DirectoryList";

const meta: Meta<typeof DirectoryList> = {
  title: "File Explorer/Directory List",
  component: DirectoryList,
  tags: ["autodocs"],
  argTypes: {
    nodes: {
      table: {
        disable: true,
      },
    },
    level: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DirectoryList>;

function WidthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-64">
      {children}
    </div>
  );
}

export const EmptyDirectory: Story = {
  render: () => (
    <WidthWrapper>
      <DirectoryList
        nodes={[
          {
            id: "2942f440-9e02-4f72-af05-3a5d1637da32",
            parentId: null,
            level: 0,
            metadata: {
              name: "Empty",
              path: "/Empty",
              type: "DIRECTORY",
            },
            children: [],
          }
        ]}
      />
    </WidthWrapper>
  )
};

export const DirectoryWithFiles: Story = {
  render: () => (
    <WidthWrapper>
      <DirectoryList
        nodes={[
          {
            id: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
            parentId: null,
            level: 0,
            metadata: {
              name: "src",
              path: "/src",
              type: "DIRECTORY",
            },
            children: [
              {
                id: "35dea223-eba1-429f-9bb8-4a9bda3eca04",
                parentId: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
                level: 1,
                metadata: {
                  name: "component.tsx",
                  path: "/src/component.tsx",
                  type: "FILE",
                },
                children: [],
              },
              {
                id: "83165c70-72cf-41db-bead-c04a89412c07",
                parentId: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
                level: 1,
                metadata: {
                  name: "store.ts",
                  path: "/src/store.ts",
                  type: "FILE",
                },
                children: [],
              },
            ],
          },
        ]}
      />
    </WidthWrapper>
  ),
};

export const SubDirectory: Story = {
  render: () => (
    <WidthWrapper>
      <DirectoryList
        nodes={[
          {
            id: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
            parentId: null,
            level: 0,
            metadata: {
              name: "src",
              path: "/src",
              type: "DIRECTORY",
            },
            children: [
              {
                id: "dd00e06d-87b1-444b-9225-0b9c1115c617",
                parentId: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
                level: 1,
                metadata: {
                  name: "state",
                  path: "/src/state",
                  type: "DIRECTORY",
                },
                children: [
                  {
                    id: "523f796a-3dd7-405e-8daa-7e74d0951274",
                    parentId: "dd00e06d-87b1-444b-9225-0b9c1115c617",
                    level: 2,
                    metadata: {
                      name: "stateSlice.ts",
                      path: "/src/state/stateSlice.ts",
                      type: "FILE",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "35dea223-eba1-429f-9bb8-4a9bda3eca04",
                parentId: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
                level: 1,
                metadata: {
                  name: "component.tsx",
                  path: "/src/component.tsx",
                  type: "FILE",
                },
                children: [],
              },
              {
                id: "83165c70-72cf-41db-bead-c04a89412c07",
                parentId: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
                level: 1,
                metadata: {
                  name: "store.ts",
                  path: "/src/store.ts",
                  type: "FILE",
                },
                children: [],
              },
            ],
          },
        ]}
      />
    </WidthWrapper>
  ),
};

export const MultipleDirectories: Story = {
  render: () => (
    <WidthWrapper>
      <DirectoryList
        nodes={[
          {
            id: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
            parentId: null,
            level: 0,
            metadata: {
              name: "src",
              path: "/src",
              type: "DIRECTORY",
            },
            children: [
              {
                id: "dd00e06d-87b1-444b-9225-0b9c1115c617",
                parentId: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
                level: 1,
                metadata: {
                  name: "state",
                  path: "/src/state",
                  type: "DIRECTORY",
                },
                children: [
                  {
                    id: "523f796a-3dd7-405e-8daa-7e74d0951274",
                    parentId: "dd00e06d-87b1-444b-9225-0b9c1115c617",
                    level: 2,
                    metadata: {
                      name: "stateSlice.ts",
                      path: "/src/state/stateSlice.ts",
                      type: "FILE",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "35dea223-eba1-429f-9bb8-4a9bda3eca04",
                parentId: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
                level: 1,
                metadata: {
                  name: "component.tsx",
                  path: "/src/component.tsx",
                  type: "FILE",
                },
                children: [],
              },
              {
                id: "83165c70-72cf-41db-bead-c04a89412c07",
                parentId: "a18b3d4a-ccfc-4a5a-932e-2f4bf197159b",
                level: 1,
                metadata: {
                  name: "store.ts",
                  path: "/src/store.ts",
                  type: "FILE",
                },
                children: [],
              },
            ],
          },
          {
            id: "cd8e1dc3-1177-4c4d-987d-fcfd2adad4bc",
            parentId: null,
            level: 0,
            metadata: {
              name: "tests",
              path: "/tests",
              type: "DIRECTORY",
            },
            children: [
              {
                id: "ec8a0b4f-04b7-476d-9b3a-cf308f3679e8",
                parentId: "cd8e1dc3-1177-4c4d-987d-fcfd2adad4bc",
                level: 1,
                metadata: {
                  name: "state",
                  path: "/tests/state",
                  type: "DIRECTORY",
                },
                children: [
                  {
                    id: "2025a784-2d88-4b53-a1e0-3154655bbf16",
                    parentId: "ec8a0b4f-04b7-476d-9b3a-cf308f3679e8",
                    level: 2,
                    metadata: {
                      name: "stateSlice.test.ts",
                      path: "/tests/state/stateSlice.test.ts",
                      type: "FILE",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "ff32917c-69b5-4a0d-a7d7-23007a42678f",
                parentId: "cd8e1dc3-1177-4c4d-987d-fcfd2adad4bc",
                level: 1,
                metadata: {
                  name: "utils",
                  path: "/tests/utils",
                  type: "DIRECTORY",
                },
                children: [],
              },
              {
                id: "7b913f7e-33cf-40c2-94c0-d03aa3941956",
                parentId: "cd8e1dc3-1177-4c4d-987d-fcfd2adad4bc",
                level: 1,
                metadata: {
                  name: "component.test.tsx",
                  path: "/src/component.test.tsx",
                  type: "FILE",
                },
                children: [],
              },
            ],
          }
        ]}
      />
    </WidthWrapper>
  ),
};

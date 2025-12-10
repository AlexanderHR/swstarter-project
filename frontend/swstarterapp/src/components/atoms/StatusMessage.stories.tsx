import type { Meta, StoryObj } from "@storybook/react";
import { StatusMessage } from "./StatusMessage";

const meta: Meta<typeof StatusMessage> = {
  title: "Atoms/StatusMessage",
  component: StatusMessage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatusMessage>;

export const Default: Story = {
  args: {
    children: <span className="text-gray-500">Loading...</span>,
  },
};

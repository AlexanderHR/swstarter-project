import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Atoms/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    label: "Radio Option",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Selected Option",
    checked: true,
  },
};

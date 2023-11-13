import type { Meta, StoryObj } from '@storybook/react';

import { NameInputGroup } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/NameInputGroup',
  component: NameInputGroup,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof NameInputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sample: Story = {
  args: {
    fullName: {
      value: 'ディオ・ブランドー',
      onChange: () => {},
    },
    preferredName: {
      value: 'デブ',
      onChange: () => {},
    },
  },
};

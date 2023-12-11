import { NameDOMComponent } from '.';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/ProfileSheet/Name',
  component: NameDOMComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof NameDOMComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Filled: Story = {
  args: {
    fullName: 'ディオ・ブランドー',
    preferredName: 'デブ',
  },
};

export const OnlyName: Story = {
  args: {
    fullName: 'うしじまかずき',
    preferredName: '',
  },
};

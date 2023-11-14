import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';

import { Overview } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/ProfileSheet/Overview',
  component: Overview,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Overview>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DayjsDOB: Story = {
  args: {
    dateOfBirth: { isCustomDOBEnabled: false, dayjsDOB: dayjs() },
    occupation: 'エンジニア',
    location: '門前仲町',
  },
};

export const CustomDOB: Story = {
  args: {
    dateOfBirth: {
      isCustomDOBEnabled: true,
      dayjsDOB: null,
      customDOB: '5/14',
    },
    occupation: 'エンジニア',
    location: '門前仲町',
  },
};

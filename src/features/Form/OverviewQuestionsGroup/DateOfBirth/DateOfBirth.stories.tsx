import dayjs from 'dayjs';

import { DateOfBirth } from '.';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Form/OverviewQuestionsGroup/DateOfBirth',
  component: DateOfBirth,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof DateOfBirth>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CustomDOB: Story = {
  args: {
    label: 'お誕生日',
    isCustomDOBEnabled: true,
    handleChangeIsCustomDOBEnabled: () => {},
    customDOB: { value: '5月14日', onChange: () => {} },
    dayjsDOB: { value: dayjs(), onChange: () => {} },
  },
};

export const DayjsDOB: Story = {
  args: {
    label: 'お誕生日',
    isCustomDOBEnabled: false,
    handleChangeIsCustomDOBEnabled: () => {},
    customDOB: { value: '', onChange: () => {} },
    dayjsDOB: { value: null, onChange: () => {} },
  },
};

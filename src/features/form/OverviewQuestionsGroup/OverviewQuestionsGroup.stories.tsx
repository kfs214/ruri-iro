import type { Meta, StoryObj } from '@storybook/react';

import { OverviewQuestionsGroupDOMComponent } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Form/OverviewQuestionsGroup',
  component: OverviewQuestionsGroupDOMComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof OverviewQuestionsGroupDOMComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sample: Story = {
  args: {
    dateOfBirth: {
      label: 'お誕生日',
      isCustomDOBEnabled: false,
      handleChangeIsCustomDOBEnabled: () => {},
      customDOB: { value: '', onChange: () => {} },
      dayjsDOB: { value: null, onChange: () => {} },
    },
    occupation: {
      value: 'エンジニア',
      onChange: () => {},
    },
    location: {
      value: '門前仲町',
      onChange: () => {},
    },
  },
};

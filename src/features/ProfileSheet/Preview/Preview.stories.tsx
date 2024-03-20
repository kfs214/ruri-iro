import { NameDOMComponent } from '../MainVisual/Name';
import { OverviewDOMComponent } from '../MainVisual/Overview';

import { Preview } from '.';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/ProfileSheet/Preview',
  component: Preview,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

function Children() {
  return (
    <>
      <OverviewDOMComponent
        DOB="95年"
        occupation="エンジニア"
        location="門前仲町"
      />
      <NameDOMComponent fullName="ディオ・ブランドー" preferredName="デブ" />
    </>
  );
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Sample: Story = {
  args: {
    children: <Children />,
  },
};

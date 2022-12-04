import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ComponentProps } from 'react';
import ExplorerList from '../list';
import Component from '.';

const ListBoundComponent = (
  { width, ...props }: ComponentProps<typeof Component> & { width: number },
) => (
  <ExplorerList width={width}>
    <Component {...props} />
  </ExplorerList>
);

export default {
  title: 'Components/Explorer/Item',
  component: ListBoundComponent,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ListBoundComponent>;

const Template: ComponentStory<typeof ListBoundComponent> = (
  (props) => <ListBoundComponent {...props} />
);

export const Folder = Template.bind({});
Folder.args = {
  name: 'closedStatusesDummylongTextName1234567890',
  selected: false,
  type: 'folder',
  unfocused: false,
  width: 240,
};

export const File = Template.bind({});
File.args = {
  name: 'closedStatusesDummylongTextName1234567890',
  selected: false,
  type: 'file',
  unfocused: false,
  width: 240,
};

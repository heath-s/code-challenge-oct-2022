import { ComponentMeta, ComponentStory } from '@storybook/react';
import Component from './base';
import ChevronRightIcon from './ChevronRight';
import ImportIcon from './Import';

export default {
  title: 'Components/Icons',
  component: Component,
} as ComponentMeta<typeof Component>;

const defaultArgs = {
  className: '',
  color: '#000000',
  height: 16,
  width: 16,
};

export const ChevronRight: ComponentStory<typeof Component> = (props) => (
  <ChevronRightIcon {...props} />
);
ChevronRight.args = {
  ...defaultArgs,
};

export const Import: ComponentStory<typeof Component> = (props) => <ImportIcon {...props} />;
Import.args = {
  ...defaultArgs,
};

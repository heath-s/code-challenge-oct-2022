import { ComponentMeta, ComponentStory } from '@storybook/react';
import Component from '.';

export default {
  title: 'Components/Drop Zone',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Component>;

export const DropZone: ComponentStory<typeof Component> = (props) => <Component {...props} />;
DropZone.args = {
  shown: true,
};

import { ComponentMeta, ComponentStory } from '@storybook/react';
import Component from '.';

export default {
  title: 'Components/Explorer',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => <div style={{ height: '100vh', width: '100%' }}><Story /></div>,
  ],
} as ComponentMeta<typeof Component>;

export const EmptyList: ComponentStory<typeof Component> = (props) => <Component {...props} />;
EmptyList.args = {
  width: 240,
};

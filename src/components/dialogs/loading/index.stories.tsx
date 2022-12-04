import { ComponentMeta, ComponentStory } from '@storybook/react';
import Component from '.';

export default {
  title: 'Components/Dialogs',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Component>;

export const Loading: ComponentStory<typeof Component> = (props) => <Component {...props} />;
Loading.args = {
  message: 'Importing in progress...',
};

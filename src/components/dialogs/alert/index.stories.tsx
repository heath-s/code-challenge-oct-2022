import { ComponentMeta, ComponentStory } from '@storybook/react';
import Component from '.';

export default {
  title: 'Components/Dialogs',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Component>;

export const Alert: ComponentStory<typeof Component> = (props) => <Component {...props} />;
Alert.args = {
  buttonLabel: 'Button',
  content: 'Body 1',
  title: 'Headline',
};

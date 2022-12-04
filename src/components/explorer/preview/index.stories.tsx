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

export const Preview: ComponentStory<typeof Component> = (props) => <Component {...props} />;
Preview.args = {
  content: 'Depending the channel type your users are chatting in, they are given different labels as well as access to different actions and information. Users can register other users as friends, interact with them in a private chat, or block specific users from sending direct messages. Depending the channel type your users are chatting in, they are given different labels as well as access to different actions and information. Users can register other users as friends, interact with them in a private chat, or block specific users from sending direct messages.',
  title: 'desk.monitoring.closedStatusesDummyLongText',
  width: 304,
};

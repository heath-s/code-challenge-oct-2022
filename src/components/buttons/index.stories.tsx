import { ComponentMeta, ComponentStory } from '@storybook/react';
import Component from './base';
import ImportButton from './import';

export default {
  title: 'Components/Buttons',
  component: Component,
} as ComponentMeta<typeof Component>;

export const Base: ComponentStory<typeof Component> = (props) => <Component {...props} />;
Base.args = {
  children: 'OK',
};

export const Import = () => <ImportButton />;

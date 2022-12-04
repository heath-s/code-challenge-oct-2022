import { ComponentMeta, ComponentStory } from '@storybook/react';
import Component from '.';

export default {
  title: 'Components/Explorer/List',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-neutral-2)',
            display: 'flex',
            flexGrow: 1,
            overflow: 'hidden',
            overflowX: 'auto',
            width: '100%',
          }}
        >
          <div
            style={{
              borderRight: '1px solid var(--color-neutral-4)',
              display: 'flex',
              flexBasis: 'min-content',
              flexWrap: 'nowrap',
              overflow: 'hidden',
              overflowX: 'auto',
            }}
          >
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
} as ComponentMeta<typeof Component>;

export const OneList: ComponentStory<typeof Component> = (props) => <Component {...props} />;
OneList.args = {
  width: 240,
};

export const TwoLists: ComponentStory<typeof Component> = (props) => (
  <>
    <Component {...props} />
    <Component {...props} />
  </>
);
TwoLists.args = {
  width: 240,
};

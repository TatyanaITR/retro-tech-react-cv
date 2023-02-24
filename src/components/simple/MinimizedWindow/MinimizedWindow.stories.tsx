import { ComponentStory, ComponentMeta } from "@storybook/react";
import MinimizedWindow, { IMinimizedWindow } from "./MinimizedWindow";
import { mockMinimizedWindowProps } from "./MinimizedWindow.mocks";

export default {
  title: "templates/MinimizedWindow",
  component: MinimizedWindow,
  argTypes: {},
} as ComponentMeta<typeof MinimizedWindow>;

const Template: ComponentStory<typeof MinimizedWindow> = (args) => (
  <MinimizedWindow {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockMinimizedWindowProps.window,
} as IMinimizedWindow;

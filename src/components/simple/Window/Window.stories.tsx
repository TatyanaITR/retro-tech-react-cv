import { ComponentStory, ComponentMeta } from "@storybook/react";
import Window, { IWindow } from "./Window";
import { mockWindowProps } from "./Window.mocks";

export default {
  title: "templates/Window",
  component: Window,
  argTypes: {},
} as ComponentMeta<typeof Window>;

const Template: ComponentStory<typeof Window> = (args) => <Window {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockWindowProps.window,
} as IWindow;

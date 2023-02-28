import { ComponentStory, ComponentMeta } from "@storybook/react";
import MinimizedWindowsBar, {
  IMinimizedWindowsBar,
} from "./MinimizedWindowsBar";
import { mockMinimizedWindowsBarProps } from "./MinimizedWindowsBar.mocks";

export default {
  title: "templates/MinimizedWindowsBar",
  component: MinimizedWindowsBar,
  argTypes: {},
} as ComponentMeta<typeof MinimizedWindowsBar>;

const Template: ComponentStory<typeof MinimizedWindowsBar> = (args) => (
  <MinimizedWindowsBar {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockMinimizedWindowsBarProps.base,
} as IMinimizedWindowsBar;

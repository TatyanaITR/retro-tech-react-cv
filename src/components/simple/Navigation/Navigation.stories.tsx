import { ComponentStory, ComponentMeta } from "@storybook/react";
import Navigation, { INavigation } from "./Navigation";
import { mockNavigationProps } from "./Navigation.mocks";

export default {
  title: "templates/Navigation",
  component: Navigation,
  argTypes: {},
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => (
  <Navigation {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockNavigationProps.base,
} as INavigation;

import { ComponentStory, ComponentMeta } from "@storybook/react";
import FeedbackForm, { IFeedbackForm } from "./FeedbackForm";
import { mockFeedbackFormProps } from "./FeedbackForm.mocks";

export default {
  title: "templates/FeedbackForm",
  component: FeedbackForm,
  argTypes: {},
} as ComponentMeta<typeof FeedbackForm>;

const Template: ComponentStory<typeof FeedbackForm> = (args) => (
  <FeedbackForm {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockFeedbackFormProps.base,
} as IFeedbackForm;

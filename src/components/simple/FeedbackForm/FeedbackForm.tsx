import styles from "./FeedbackForm.module.css";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

export interface IFeedbackForm {}
interface FeedbackFormValues {
  name: string;
  email: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
});

const initialValues: FeedbackFormValues = {
  name: "",
  email: "",
  message: "",
};

const FeedbackForm: React.FC = () => {
  const onSubmit = (values: FeedbackFormValues, actions: any) => {
    const templateParams = {
      name: values.name,
      email: values.email,
      message: values.message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
      )
      .then(
        (response) => {
          toast.success("Your message has been sent!");
          actions.resetForm();
        },
        (error) => {
          toast.error(
            "There was an error sending your message. Please try again later."
          );
        }
      );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="name">How can we contact you?</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="email">Your email address:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="message">Your message:</label>
            <Field as="textarea" name="message" />
            <ErrorMessage name="message" component="div" />
          </div>

          <button type="submit">Send</button>
        </Form>
      )}
    </Formik>
  );
};

export default FeedbackForm;

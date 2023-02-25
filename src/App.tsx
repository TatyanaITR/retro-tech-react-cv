import { WindowsList } from "./components/containers/WindowList/WindowsList";
import { ToastContainer } from "react-toastify";
import FeedbackForm from "./components/simple/FeedbackForm/FeedbackForm";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <WindowsList />*/}
    </>
  );
};

export default App;

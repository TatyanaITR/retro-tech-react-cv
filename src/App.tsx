import { Desktop } from "./components/containers/Desktop/Desktop";
import { ToastContainer } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { DesktopProvider } from "./components/containers/Desktop/Desktop.context";
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
      <DesktopProvider>
        <Desktop />
      </DesktopProvider>
    </>
  );
};

export default App;

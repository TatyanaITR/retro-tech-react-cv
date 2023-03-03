import { Provider } from "react-redux";
import { Desktop } from "./components/containers/Desktop/Desktop";
import { ToastContainer } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./core/store/store";
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
      <Provider store={store}>
        <Desktop />
      </Provider>
    </>
  );
};

export default App;

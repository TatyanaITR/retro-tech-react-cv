import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import files from "./files";

export const store = configureStore({
  reducer: {
    files,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useStoreDispatch = () => useDispatch<AppDispatch>();

//export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;

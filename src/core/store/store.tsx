import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import files from "./files";
import windows from "./windows";

export const store = configureStore({
  reducer: {
    files,
    windows,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useStoreDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

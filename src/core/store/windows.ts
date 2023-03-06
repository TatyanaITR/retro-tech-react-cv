import { createSlice } from "@reduxjs/toolkit";
import { IBaseWindow } from "../../components/simple/Window/Window";

type IWindows = Array<IBaseWindow>;
type IMinimizedWindows = Array<IBaseWindow>;

export interface IWindowsState {
  openWindows: IWindows;
  minimizedWindows: IMinimizedWindows;
}

const initialState: IWindowsState = {
  openWindows: [],
  minimizedWindows: [],
};

const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    openWindow: (state, action) => {
      return {
        ...state,
        openWindows: [
          ...state.openWindows.map((window) => ({
            ...window,
            isActive: false,
          })),
          { ...action.payload, isActive: true },
        ],
      };
    },
    closeWindow: (state, action) => {
      const updatedWindows = state.openWindows
        .filter((window) => window.id !== action.payload)
        .map((window, index, windows) => ({
          ...window,
          isActive: windows.length === 1 || index === windows.length - 1,
        }));
      return {
        ...state,
        openWindows: updatedWindows,
        minimizedWindows: state.minimizedWindows.filter(
          (window) => window.id !== action.payload
        ),
      };
    },
  },
});

export const { openWindow, closeWindow } = windowsSlice.actions;
export default windowsSlice.reducer;

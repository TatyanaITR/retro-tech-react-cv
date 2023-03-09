import { createSlice } from "@reduxjs/toolkit";
import { IBaseWindow } from "../../components/simple/Window/Window";

type IWindows = Array<IBaseWindow>;
type IMinimizedWindows = Array<IBaseWindow>;

export interface IWindowsState {
  openWindows: IWindows;
  minimizedWindows: IMinimizedWindows;
  activeWindowId: string;
}

const initialState: IWindowsState = {
  openWindows: [],
  minimizedWindows: [],
  activeWindowId: "",
};

const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    openWindow: (state, action) => {
      return {
        ...state,
        activeWindowId: action.payload.id,
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
        // @ts-ignore
        minimizedWindows: state.minimizedWindows.filter(
          (window) => window.id !== action.payload
        ),
      };
    },
    minimizeWindow: (state, action) => {
      const minimizedWindow = state.openWindows.find(
        (window) => window.id === action.payload
      );
      if (!minimizedWindow) {
        throw new Error("There is a problem with minimized window");
      }
      const updatedWindowsOnMinimize = state.openWindows.map((window) => ({
        ...window,
        isActive: window.id !== action.payload && window.isActive,
      }));
      return {
        ...state,
        openWindows: updatedWindowsOnMinimize.filter(
          (window) => window.id !== action.payload
        ),
        minimizedWindows: [...state.minimizedWindows, minimizedWindow],
      };
    },
    restoreWindow: (state, action) => {
      const restoredWindow: IBaseWindow | undefined =
        state.minimizedWindows.find((window) => window.id === action.payload);
      if (!restoredWindow) {
        throw new Error("There is a problem with restored window");
      }
      const updatedWindowsOnRestore = state.openWindows.map((window) => {
        if (window.isActive) {
          return {
            ...window,
            isActive: false,
          };
        }
        return window;
      });
      return {
        ...state,
        openWindows: [
          ...updatedWindowsOnRestore,
          { ...restoredWindow, isActive: true },
        ],
        minimizedWindows: state.minimizedWindows.filter(
          (window) => window.id !== action.payload
        ),
      };
    },
    activateWindow: (state, action) => {
      return {
        ...state,
        activeWindowId: action.payload,
        openWindows: state.openWindows.map((window) => ({
          ...window,
          isActive: window.id === action.payload,
        })),
      };
    },
    deactivateWindows: (state) => {
      return {
        ...state,
        activeWindowId: "",
        openWindows: state.openWindows.map((window) => ({
          ...window,
          isActive: false,
        })),
      };
    },
  },
});

export const {
  openWindow,
  closeWindow,
  minimizeWindow,
  restoreWindow,
  activateWindow,
  deactivateWindows,
} = windowsSlice.actions;
export default windowsSlice.reducer;

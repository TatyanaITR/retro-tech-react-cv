import { IWindow } from "../../simple/Window/Window";
import { appSettings } from "../../../core/config/variables";

export const getWindowCoords = (
  width: number,
  height: number,
  lastCoords: { x: number; y: number }
): { x: number; y: number } => {
  const { innerWidth, innerHeight } = window;

  if (
    lastCoords.x + width > innerWidth ||
    lastCoords.y + height > innerHeight
  ) {
    lastCoords = { x: 0, y: 0 };
  }

  lastCoords = {
    x: lastCoords.x + appSettings.cascadeStep,
    y: lastCoords.y + appSettings.cascadeStep,
  };

  return lastCoords;
};

export const isWindowOpen = (state: IWindow[], id: number): boolean => {
  return state.some((window) => window.id === id);
};

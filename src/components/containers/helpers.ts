import { IWindow } from "../simple/Window/Window";

export interface ICoords {
  x: number;
  y: number;
}

export const getWindowCoords = (
  lastCoords: ICoords,
  width: number,
  height: number
): ICoords => {
  const cascadeStep = 20;
  const boundaryOffset = 100;

  let { x, y } = lastCoords;

  if (x + width > window.innerWidth) {
    x = cascadeStep;
    y += boundaryOffset;
  }

  if (y + height > window.innerHeight) {
    x = cascadeStep;
    y = cascadeStep;
  }

  return { x, y };
};

export const isWindowOpen = (state: IWindow[], id: number): boolean => {
  return state.some((window) => window.id === id);
};

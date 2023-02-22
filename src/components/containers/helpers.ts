import { IWindow } from "../simple/Window/Window";

interface ICoords {
  x: number;
  y: number;
}

export const getWindowCoords = (width: number, height: number): ICoords => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  let x = 3;
  let y = 15;

  return { x, y };
};

export const isWindowOpen = (state: IWindow[], id: number): boolean => {
  return state.some((window) => window.id === id);
};

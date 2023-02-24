import { Coords } from "../types/commonTypes";

type AppSettings = {
  initialCoords: Coords;
  mockWindowSize: { w: number; h: number };
  cascadeStep: number;
};

export const appSettings: AppSettings = {
  initialCoords: { x: 20, y: 15 },
  cascadeStep: 40,
  mockWindowSize: { w: 400, h: 300 },
};

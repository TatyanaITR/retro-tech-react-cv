import { Coords } from "../types/commonTypes";
import { nanoid } from "nanoid";

type AppSettings = {
  initialCoords: Coords;
  defaultWindowSize: { w: number; h: number };
  cascadeStep: number;
  navId: string;
};

export const appSettings: AppSettings = {
  initialCoords: { x: 20, y: 15 },
  cascadeStep: 40,
  defaultWindowSize: { w: 400, h: 300 },
  navId: nanoid(),
};

import { IMinimizedWindow } from "./MinimizedWindow";

const window: IMinimizedWindow = {
  id: 1,
  x: 100,
  y: 100,
  header: "This header",
  buttons: ["close", "maximize", "minimize"],
  onClose: () => console.log("Closing window"),
  onMinimize: () => console.log("Minimizing window"),
  onMaximize: () => console.log("Maximizing window"),
};

export const mockMinimizedWindowProps = {
  window,
};

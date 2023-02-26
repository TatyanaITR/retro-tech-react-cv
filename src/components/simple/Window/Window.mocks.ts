import { IWindow } from "./Window";

const window: IWindow = {
  id: "1",
  coords: { x: 15, y: 20 },
  header: "This header",
  content: [],
  windowtypes: "default",
  buttons: ["close", "minimize"],
  onClose: () => console.log("Closing window"),
  onMinimize: () => console.log("Minimizing window"),
  onMouseDown: () => (window.isActive = true),
};

export const mockWindowProps = {
  window,
};

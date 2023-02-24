import { IWindow } from "./Window";

const window: IWindow = {
  id: 1,
  coords: { x: 15, y: 20 },
  header: "This header",
  buttons: ["close", "minimize"],
  onClose: () => console.log("Closing window"),
  onMinimize: () => console.log("Minimizing window"),
};

export const mockWindowProps = {
  window,
};

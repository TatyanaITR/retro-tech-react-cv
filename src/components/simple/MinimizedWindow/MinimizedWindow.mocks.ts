import { IWindow } from "../Window/Window";

const window: IWindow = {
  content: [],
  coords: { x: 0, y: 0 },
  id: "1",
  header: "This header",
  onRestore: () => console.log("Restore window"),
  onClose: () => console.log("Closing window"),
  onMinimize(): void {},
  onMouseDown(): void {},
};

export const mockMinimizedWindowProps = {
  window,
};

import { IMinimizedWindow } from "./MinimizedWindow";

const window: IMinimizedWindow = {
  id: 1,
  header: "This header",
  onRestore: () => console.log("Restore window"),
  onClose: () => console.log("Closing window"),
};

export const mockMinimizedWindowProps = {
  window,
};

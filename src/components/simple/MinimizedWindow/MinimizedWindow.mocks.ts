import { IMinimizedWindow } from "./MinimizedWindow";

const window: IMinimizedWindow = {
  id: "",
  header: "This header",
  onRestore: () => console.log("Restore window"),
  onClose: () => console.log("Closing window"),
};

export const mockMinimizedWindowProps = {
  window,
};

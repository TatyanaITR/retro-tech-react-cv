import { DocType, ShortcutType } from "../../../../core/api/files.types";

export const defaultIcons = {
  [DocType.Folder]: "default-folder",
  [DocType.Document]: "default-file",
  [DocType.Shortcut]: (shortcutType: ShortcutType) => {
    if (shortcutType === ShortcutType.Folder) {
      return "default-folder";
    } else if (shortcutType === ShortcutType.Document) {
      return "default-file";
    } else {
      throw new Error("Invalid shortcut type");
    }
  },
};

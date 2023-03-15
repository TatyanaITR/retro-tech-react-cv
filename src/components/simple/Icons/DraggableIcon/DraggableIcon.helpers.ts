import { DocType, LabelType } from "../../../../core/api/files.types";

export const defaultIcons = {
  [DocType.Folder]: "default-folder",
  [DocType.Document]: "default-file",
  [DocType.Label]: (labelType: LabelType) => {
    if (labelType === LabelType.Folder) {
      return "default-folder";
    } else if (labelType === LabelType.Document) {
      return "default-file";
    } else {
      throw new Error("Invalid Label type");
    }
  },
};

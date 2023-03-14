import { DocType, LabelType } from "../../../core/api/files.types";

export interface Item {
  id: string;
  title: string;
  icon_name: string | null;
  type: DocType;
  linkType?: LabelType;
}

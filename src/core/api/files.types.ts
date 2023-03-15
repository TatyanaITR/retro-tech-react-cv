import { Database } from "../utils/supabase.types";

export interface IFullFolder {
  folder: Folder;
  children: {
    subfolders: Folder[];
    documents: Document[];
    labels: Label[];
  };
}
export interface ITree {
  item: Folder | Document | Label;
  children: ITree[];
}
export interface IRawData {
  folders: Folder[];
  documents: Document[];
  labels: Label[];
}

export type Folder = Omit<
  Database["public"]["Tables"]["folders"]["Row"],
  "type"
> & {
  type: DocType;
};
export type Document = Omit<
  Database["public"]["Tables"]["documents"]["Row"],
  "type"
> & {
  type: DocType;
};
export type Label = Omit<
  Database["public"]["Tables"]["labels"]["Row"],
  "type"
> & {
  type: DocType;
  label_type: LabelType;
};

export enum DocType {
  Folder = "folder",
  Document = "document",
  Label = "label",
}
export enum LabelType {
  Folder = DocType.Folder,
  Document = DocType.Document,
}

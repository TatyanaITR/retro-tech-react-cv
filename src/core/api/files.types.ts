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
export type FileSystemElement = Folder | Document | Label;

export type Folder = Database["public"]["Tables"]["folders"]["Row"];
export type Document = Database["public"]["Tables"]["documents"]["Row"];
export type Label = Database["public"]["Tables"]["labels"]["Row"];

export enum DocType {
  Folder = "folder",
  Document = "document",
  Label = "label",
}
export enum LabelType {
  Folder = DocType.Folder,
  Document = DocType.Document,
}

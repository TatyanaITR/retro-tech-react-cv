import { Database } from "../utils/supabase.types";

export interface IFullFolder {
  folder: Folder;
  children: {
    subfolders: Folder[];
    documents: Document[];
    shortcuts: Shortcut[];
  };
}

export type Folder = Database["public"]["Tables"]["folders"]["Row"];
export type Document = Database["public"]["Tables"]["documents"]["Row"];
export type Shortcut = Database["public"]["Tables"]["shortcuts"]["Row"];

export enum DocType {
  Folder = "folder",
  Document = "document",
  Shortcut = "shortcut",
}
export enum ShortcutType {
  Folder = DocType.Folder,
  Document = DocType.Document,
}

import { Database } from "../utils/supabase.types";

export type Folder = Database["public"]["Tables"]["folders"]["Row"];

export interface IFullFolder {
  folder: Folder;
  subfolders: Folder[];
}

export type Inner_docs = Database["public"]["Tables"]["inner_docs"]["Row"];
export type Document = Database["public"]["Tables"]["documents"]["Row"];
export type Folder_shortcut =
  Database["public"]["Tables"]["folders_shortcuts"]["Row"];
export type Document_shortcut =
  Database["public"]["Tables"]["docs_shortcuts"]["Row"];

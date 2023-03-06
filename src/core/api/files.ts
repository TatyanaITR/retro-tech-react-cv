import { supabase } from "../utils/supabase.utils";
import { Folder, IFullFolder } from "./files.types";
import { toast } from "react-toastify";

export async function getFolderApi(id: string): Promise<IFullFolder | null> {
  try {
    const { data: folderData } = await supabase
      .from("folders")
      .select("*")
      .eq("id", id)
      .single();
    const { data: subfolderIds } = await supabase
      .from("inner_docs")
      .select("folders")
      .eq("folder_id", id)
      .single();
    if (!subfolderIds) {
      return { folder: folderData as Folder, subfolders: [] };
    }
    const { data: subfolders } = await supabase
      .from("folders")
      .select("*")
      .in("id", subfolderIds.folders);
    return { folder: folderData as Folder, subfolders: subfolders as Folder[] };
  } catch (error) {
    console.log(error);
    return null;
  }
}

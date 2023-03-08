import { supabase } from "../utils/supabase.utils";
import { Document, Folder, IFullFolder, Shortcut } from "./files.types";

export async function getFullFolderApi(
  id: string
): Promise<IFullFolder | undefined> {
  try {
    const { data: folderData, error: folderError } = await supabase.rpc(
      "get_folder_with_subitems",
      { id_input: id }
    );
    return folderData;
  } catch (error) {
    console.log(error);
  }
}

/*export async function getFullFolderApi(
  id: string
): Promise<IFullFolder | undefined> {
  try {
    const { data: folderData, error: folderError } = await supabase
      .from("folders")
      .select("*")
      .eq("id", id)
      .single();

    const { data: subfoldersData, error: subfoldersError } = await supabase
      .from("folders")
      .select("*")
      .eq("parent_id", id);

    const { data: documentsData, error: documentsError } = await supabase
      .from("documents")
      .select("*")
      .eq("parent_id", id);

    const { data: shortcutsData, error: shortcutsError } = await supabase
      .from("shortcuts")
      .select("*")
      .eq("parent_id", id);
    return {
      folder: folderData as Folder,
      subfolders: subfoldersData as Folder[],
      documents: documentsData as Document[],
      shortcuts: shortcutsData as Shortcut[],
    };
  } catch (error) {
    console.log(error);
  }
}*/

import { supabase } from "../utils/supabase.utils";
import { Document, Folder, IFullFolder, Label } from "./files.types";

export async function getDataApi() {
  try {
    const {
      data: [folders, documents, labels],
    } = await supabase.rpc("get_data");
    if (![folders, documents, labels]) {
      throw new Error("Data not found");
    }
    return { folders, documents, labels };
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return {
      folders: [] as Folder[],
      documents: [] as Document[],
      labels: [] as Label[],
    };
  }
}

export async function getFullFolderApi(id: string): Promise<IFullFolder> {
  try {
    const { data: folderData } = await supabase.rpc(
      "get_folder_with_subitems",
      { id_input: id }
    );
    if (!folderData) {
      throw new Error("Folder data not found");
    }
    return folderData;
  } catch (folderError) {
    console.log(folderError);
    throw new Error("Error fetching folder data");
  }
}

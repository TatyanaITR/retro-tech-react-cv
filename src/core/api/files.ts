import { supabase } from "../utils/supabase.utils";
import { Document, Folder, IFullFolder, Label } from "./files.types";

export async function getDataApi() {
  try {
    const { data: dataArray } = await supabase.rpc("get_data");
    if (!dataArray) {
      throw new Error("Data not found");
    }
    const [data] = dataArray;
    return {
      folders: data.folders as Folder[],
      documents: data.documents as Document[],
      labels: data.labels as Label[],
    };
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return {
      folders: [] as Folder[],
      documents: [] as Document[],
      labels: [] as Label[],
    };
  }
}

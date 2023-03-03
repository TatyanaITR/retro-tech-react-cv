import { supabase } from "../utils/supabase.utils";
import { Folder } from "./files.types";
import { toast } from "react-toastify";

export async function getDesktopApi(): Promise<Folder | null> {
  try {
    const response = await supabase
      .from("folders")
      .select("*")
      .eq("title", "Desktop")
      .single();
    return response.data as Folder;
  } catch (error) {
    console.error(error);
    toast.error("Failed to get desktop folder", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return null;
  }
}

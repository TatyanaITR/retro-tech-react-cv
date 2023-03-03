import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDesktopApi } from "../api/files";
import { Folder } from "../api/files.types";
import { toast } from "react-toastify";

interface IFilesState {
  rootFolder: Folder;
  bufferFolder: Folder;
  currentFolder: Folder;
  isLoading: boolean;
}

const initialState: IFilesState = {
  rootFolder: {} as Folder,
  bufferFolder: {} as Folder,
  currentFolder: {} as Folder,
  isLoading: true,
};

export const getDesktop = createAsyncThunk("getDesktop", async () => {
  return await getDesktopApi();
});

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    loadFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDesktop.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.rootFolder = action.payload;
        }
      })
      .addCase(getDesktop.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to get desktop folder. Please refresh page", {});
      });
  },
});

export const { loadFolder } = filesSlice.actions;
export default filesSlice.reducer;

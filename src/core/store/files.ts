import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFolderApi } from "../api/files";
import { IFullFolder } from "../api/files.types";
import { toast } from "react-toastify";
import { action } from "@storybook/addon-actions";

interface IFilesState {
  rootFolder: IFullFolder;
  bufferFolder: IFullFolder;
  currentFolder: IFullFolder;
  test: any;
  isLoading: boolean;
}

const initialState: IFilesState = {
  rootFolder: {} as IFullFolder,
  bufferFolder: {} as IFullFolder,
  currentFolder: {} as IFullFolder,
  test: {},
  isLoading: true,
};

export const getFolder = createAsyncThunk("getFolders", async (id: string) => {
  return await getFolderApi(id);
});

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setRootFolder: (state, action) => {
      if (action.payload) {
        state.rootFolder = action.payload;
      } else {
        toast.error("Can't load desktop. Please refresh page", {});
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFolder.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.currentFolder = action.payload;
        } else {
          console.log("no payload");
        }
      })
      .addCase(getFolder.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to get folder. Please refresh page", {});
      });
  },
});

export const { setRootFolder } = filesSlice.actions;
export default filesSlice.reducer;

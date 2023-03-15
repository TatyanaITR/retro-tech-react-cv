import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataApi } from "../api/files";
import { IFullFolder, IRawData, ITree } from "../api/files.types";
import { buildTree, mergeAndSortObjects } from "./files.helpers";

interface IFilesState {
  rootFolder: IFullFolder;
  bufferFolder: IFullFolder;
  currentFolder: IFullFolder;
  foldersTree: ITree[];
  rawData: IRawData;
  isLoading: boolean;
  error: any;
}

const initialState: IFilesState = {
  rootFolder: {} as IFullFolder,
  bufferFolder: {} as IFullFolder,
  currentFolder: {} as IFullFolder,
  foldersTree: [] as ITree[],
  rawData: {} as IRawData,
  isLoading: true,
  error: "",
};

export const getRawData = createAsyncThunk(
  "files/getRawData",
  async (_, { rejectWithValue }) => {
    try {
      return await getDataApi();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    buildFolderTree: (state) => {
      if (state.rawData) {
        state.foldersTree = buildTree(mergeAndSortObjects(state.rawData), null);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRawData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRawData.fulfilled, (state, action) => {
        if (action.payload) {
          state.rawData = action.payload;
          const data = mergeAndSortObjects(action.payload);
          state.foldersTree = buildTree(data, null);
          console.log(state.foldersTree);
          state.isLoading = false;
        }
      })
      .addCase(getRawData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { buildFolderTree } = filesSlice.actions;
export default filesSlice.reducer;

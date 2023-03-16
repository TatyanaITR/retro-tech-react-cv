import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataApi } from "../api/files";
import { IFullFolder, IRawData, ITree } from "../api/files.types";
import {
  buildTree,
  findFolderById,
  mergeAndSortObjects,
} from "./files.helpers";

interface IFilesState {
  rootFolder: IFullFolder;
  bufferFolder: IFullFolder;
  currentFolder: ITree;
  foldersTree: ITree[];
  rawData: IRawData;
  isLoading: boolean;
  error: any;
}

const initialState: IFilesState = {
  rootFolder: {} as IFullFolder,
  bufferFolder: {} as IFullFolder,
  currentFolder: {} as ITree,
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
    getFolder: (state, action) => {
      const folderId = action.payload;
      const foundFolder = findFolderById(state.foldersTree, folderId);
      if (foundFolder) {
        state.currentFolder = foundFolder;
      } else {
        console.error(`Папка с id ${folderId} не найдена`);
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
          state.isLoading = false;
        }
      })
      .addCase(getRawData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { buildFolderTree, getFolder } = filesSlice.actions;
export default filesSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataApi } from "../api/files";
import { IFullFolder, Document, IRawData, ITree } from "../api/files.types";
import {
  buildTree,
  findFolderById,
  mergeAndSortObjects,
} from "./files.helpers";

interface IFilesState {
  rootFolder: IFullFolder;
  bufferFolder: IFullFolder;
  currentFolder: ITree;
  currentDoc: Document;
  foldersTree: ITree[];
  rawData: IRawData;
  isLoading: boolean;
  error: any;
}

const initialState: IFilesState = {
  rootFolder: {} as IFullFolder,
  bufferFolder: {} as IFullFolder,
  currentFolder: {} as ITree,
  currentDoc: {} as Document,
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
    getDocument: (state, action) => {
      const docId = action.payload;
      const foundDoc = state.rawData.documents.find(el => el.id === docId)
      if (foundDoc) {
        state.currentDoc = foundDoc;
      } else {
        console.error(`Файл с id ${docId} не найден`);
      }
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
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

export const { buildFolderTree, getFolder, getDocument, setIsLoading } = filesSlice.actions;
export default filesSlice.reducer;

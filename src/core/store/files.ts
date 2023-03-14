import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataApi, getFullFolderApi } from "../api/files";
import { IFullFolder, IRawData } from "../api/files.types";
import { toast } from "react-toastify";

interface IFilesState {
  rootFolder: IFullFolder;
  bufferFolder: IFullFolder;
  currentFolder: IFullFolder;
  rawData: IRawData;
  isLoading: boolean;
}

const initialState: IFilesState = {
  rootFolder: {} as IFullFolder,
  bufferFolder: {} as IFullFolder,
  currentFolder: {} as IFullFolder,
  rawData: {} as IRawData,
  isLoading: true,
};

export const getRowData = createAsyncThunk(
  "files/getRowData",
  async (_, { rejectWithValue }) => {
    try {
      return await getDataApi();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFolder = createAsyncThunk(
  "files/getFolder",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getFullFolderApi(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadRootFolder = createAsyncThunk(
  "files/loadRootFolder",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(getFolder(id));
      if (response.payload) {
        dispatch(setRootFolder(response.payload));
      } else {
        throw new Error("Folder data not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setRootFolder: (state, action) => {
      if (action.payload) {
        state.rootFolder = state.currentFolder;
        state.isLoading = false;
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
          // @ts-ignore
          state.currentFolder = action.payload;
        } else {
          console.log("no payload");
        }
      })
      .addCase(getFolder.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to get folder. Please refresh page", {});
      })
      .addCase(getRowData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          // @ts-ignore
          state.rawData = action.payload;
        } else {
          console.log("no data");
        }
      })
      .addCase(getRowData.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to get folder. Please refresh page", {});
      })
      .addCase(loadRootFolder.rejected, (state) => {
        state.isLoading = true;
        toast.error("Failed to get folder. Please refresh page", {});
      });
  },
});

export const { setRootFolder } = filesSlice.actions;
export default filesSlice.reducer;

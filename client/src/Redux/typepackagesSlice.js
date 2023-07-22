import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'https://deploy-back-fayx.vercel.app'
// Thunk action para obtener typepackages del servidor
export const fetchTypepackages = createAsyncThunk(
  "typepackages/fetchTypepackages",
  async () => {
    const response = await axios.get(`${URL}/typepackages`);
    return response.data;
  }
);

export const typepackagesSlice = createSlice({
  name: "typepackages",
  initialState: { typepackagesList: [], status: "idle", error: null },
  reducers: {
    // Reducer para agregar un nuevo typepackage
    addTypepackage: (state, action) => {
      state.typepackagesList.push(action.payload);
    },
  },
  extraReducers: {
    // Reducer para obtener los typepackages del servidor
    [fetchTypepackages.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchTypepackages.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.typepackagesList = action.payload;
    },
    [fetchTypepackages.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addTypepackage } = typepackagesSlice.actions;

export default typepackagesSlice.reducer;
export const selectTypepackages = (state) =>
  state.typepackages.typepackagesList;
export const selectTypepackagesStatus = (state) => state.typepackages.status;

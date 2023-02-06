import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {categoriesAPI} from '../../API/API';

const initialState = {
    categories: [],
    status: "null",
    error: null
}
export const fetchCategories: any = createAsyncThunk(
    'categories/fetchCategories',
    async function (_, thunkAPI) {
        try {
            const response = await categoriesAPI.getAllCategories()
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue((error as Error).message)
        }
    }
)
const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = "resolved"
            state.categories = action.payload
        })
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
    }
})
export default categoriesSlice.reducer

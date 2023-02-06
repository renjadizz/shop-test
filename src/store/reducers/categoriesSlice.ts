import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {categoriesAPI} from '../../API/API';

const initialState = {
    categories: [],
    status: "null"
}
export const fetchCategories: any = createAsyncThunk(
    'categories/fetchCategories',
    async function () {
        const response = await categoriesAPI.getAllCategories()
        return response
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
    }
})
export default categoriesSlice.reducer

import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchField: ""
}
const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        changeSearch(state, action) {
            state.searchField = action.payload
        }
    }
})
export const {changeSearch} = searchSlice.actions
export default searchSlice.reducer
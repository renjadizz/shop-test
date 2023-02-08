import {RootState} from "./store";

export const selectProducts = (state: RootState) => state.products
export const selectCart = (state: RootState) => state.cart
export const selectSearchField = (state: RootState) => state.search.searchField
export const selectCategories = (state: RootState) => state.categories
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import productsSlice from "./reducers/productsSlice";
import categoriesSlice from "./reducers/categoriesSlice";

const rootReducer = combineReducers({
    products: productsSlice,
    categories: categoriesSlice
})
export const store = configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
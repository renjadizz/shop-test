import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import productsSlice from "./reducers/productsSlice";
import categoriesSlice from "./reducers/categoriesSlice";
import cartSlice from "./reducers/cartSlice";
import {listenerMiddleware} from "./listenerMiddleware";

const rootReducer = combineReducers({
    products: productsSlice,
    categories: categoriesSlice,
    cart: cartSlice
})
const reHydrateStore = () => {
    if (localStorage.getItem('cart') !== null) {
        return JSON.parse(localStorage.getItem('cart') || '{}')
    }
}
export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {cart: reHydrateStore()},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
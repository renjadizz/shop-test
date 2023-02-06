import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {addToCart, changeCart, deleteProductInCart, emptyCart} from "./reducers/cartSlice";
import {RootState} from "./store";

export const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
    matcher: isAnyOf(addToCart, changeCart, deleteProductInCart, emptyCart),
    effect: async (action, listenerApi) => {
        let currentState = listenerApi.getState() as RootState
        let currentCart = currentState.cart
        localStorage.setItem("cart", JSON.stringify(currentCart)
        )
    }
})


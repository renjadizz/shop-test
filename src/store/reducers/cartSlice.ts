import {createSlice} from "@reduxjs/toolkit";
import {ProductType} from "./productsSlice";

interface ProductTypeWithAmountType extends ProductType {
    quantity: number
    img: string
    priceSum: number
}

export type CartType = {
    cart: ProductTypeWithAmountType[],
    totalPrice: number,
    status: string
}
const initialState: CartType = {
    cart: [],
    totalPrice: 0,
    status: "null"
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const productIndex = findCartIndex(state, action, action.payload.id)
            if (productIndex !== -1) {
                state.cart[productIndex].quantity += 1
                state.cart[productIndex].priceSum += action.payload.price
            } else {
                state.cart.push(action.payload)
            }
            state.totalPrice += action.payload.price
        }
    }
})
const findCartIndex = (state: any, action: any, id: number) => {
    const foundIndex = state.cart.findIndex((product: any) => product.id === id)
    return foundIndex
}
export const {addToCart} = cartSlice.actions
export default cartSlice.reducer
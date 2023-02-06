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
        },
        changeCart(state, action) {
            const productIndex = findCartIndex(state, action, action.payload.id)
            const oldPrice = state.cart[productIndex].quantity * state.cart[productIndex].price
            const newPrice = action.payload.quantity * state.cart[productIndex].price
            state.cart[productIndex].priceSum = state.cart[productIndex].priceSum - oldPrice + newPrice
            state.cart[productIndex].quantity = action.payload.quantity
            state.totalPrice = state.totalPrice - oldPrice + newPrice
        },
        deleteProductInCart(state, action) {
            const productIndex = findCartIndex(state, action, action.payload.id)
            state.totalPrice = state.totalPrice - state.cart[productIndex].quantity * state.cart[productIndex].price
            state.cart = state.cart.filter(product => product.id !== action.payload.id)
        }
    }
})
const findCartIndex = (state: any, action: any, id: number) => {
    const foundIndex = state.cart.findIndex((product: any) => product.id === id)
    return foundIndex
}
export const {addToCart, changeCart, deleteProductInCart} = cartSlice.actions
export default cartSlice.reducer
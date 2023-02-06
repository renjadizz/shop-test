import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProductType} from "./productsSlice";
import {cartAPI, userAPI} from "../../API/API";

interface ProductTypeWithAmountType extends ProductType {
    quantity: number
    img: string
    priceSum: number
}

export type CartType = {
    cart: ProductTypeWithAmountType[],
    totalPrice: number,
    status: string,
    error: any
}
const initialState: CartType = {
    cart: [],
    totalPrice: 0,
    status: "null",
    error: null
}
type CartPostType = {
    userId: number | null,
    products: { id: number, quantity: number }[]
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
        },
        emptyCart(state, action) {
            state.cart = []
            state.totalPrice = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(confirmOrder.fulfilled, (state, action) => {
            state.status = "resolved"
            state.cart = []
            state.totalPrice = 0
        })
        builder.addCase(confirmOrder.pending, (state, action) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(confirmOrder.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
    }
})
export const confirmOrder = createAsyncThunk(
    'cart/confirmOrder',
    async function (userInfo: {}, thunkAPI) {
        try {
            const user = await userAPI.createUser(userInfo)
            const state: any = thunkAPI.getState()
            let postObject: CartPostType = {userId: null, products: []}
            postObject.userId = user.id - 1
            state.cart.cart.map((product: ProductTypeWithAmountType) => {
                postObject.products.push({id: product.id, quantity: product.quantity})
            })
            const response = await cartAPI.createCart(postObject)
            return response
            thunkAPI.dispatch(emptyCart)
        } catch (error) {
            return thunkAPI.rejectWithValue((error as Error).message)
        }
    }
)
const findCartIndex = (state: any, action: any, id: number) => {
    const foundIndex = state.cart.findIndex((product: any) => product.id === id)
    return foundIndex
}
export const {addToCart, changeCart, deleteProductInCart, emptyCart} = cartSlice.actions
export default cartSlice.reducer
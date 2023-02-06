import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {productsAPI} from '../../API/API';

export type ProductType = {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: [string]
}
export type ProductsType = {
    total: number,
    products: [ProductType] | [],
    status: string,
    pageSize: number,
    currentPage: number,
    error: any
}
const initialState: ProductsType = {
    total: 0,
    products: [],
    status: "null",
    pageSize: 2,
    currentPage: 1,
    error: null
}
export const fetchProductsPopular = createAsyncThunk(
    'products/fetchProducts',
    async function (_, thunkAPI) {
        try {
            const response = await productsAPI.getProductsByPopularity()
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue((error as Error).message)
        }
    }
)
export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async function (categoryName: string | undefined, thunkAPI) {
        try {
            const state: any = thunkAPI.getState()
            const toSkip = (state.products.currentPage - 1) * state.products.pageSize
            const response = await productsAPI.getProductsByCategory(categoryName, state.products.pageSize, toSkip)
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue((error as Error).message)
        }
    }
)
export const fetchProductsTotal = createAsyncThunk(
    'products/fetchProductsTotal',
    async function (_, thunkAPI) {
        try {
            const response = await productsAPI.getProductsTotal()
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue((error as Error).message)
        }
    }
)
export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async function (productId: string, thunkAPI) {
        try {
            const response = await productsAPI.getProduct(productId)
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue((error as Error).message)
        }
    }
)
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = "resolved"
            state.products = [action.payload]
        })
        builder.addMatcher(isAnyOf(fetchProductsPopular.fulfilled, fetchProductsByCategory.fulfilled, fetchProductsTotal.fulfilled),
            (state, action) => {
                state.status = "resolved"
                state.products = action.payload.products
                state.total = action.payload.total
            })
        builder.addMatcher(isAnyOf(fetchProductsPopular.pending, fetchProductsByCategory.pending, fetchProductsTotal.pending, fetchProduct.pending),
            (state, action) => {
                state.status = "loading"
                state.error = null
            })
        builder.addMatcher(isAnyOf(fetchProductsPopular.rejected, fetchProductsByCategory.rejected, fetchProductsTotal.rejected, fetchProduct.rejected),
            (state, action) => {
                state.status = "rejected"
                state.error = action.payload
            })
    },
})

export const {changeCurrentPage} = productsSlice.actions
export default productsSlice.reducer

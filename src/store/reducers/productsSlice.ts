import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
type ProductsType = {
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
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct(state, action) {
            // state.products.push({})
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsPopular.fulfilled, (state, action) => {
            state.status = "resolved"
            state.products = action.payload.products
            state.total = action.payload.total
        })
        builder.addCase(fetchProductsPopular.pending, (state, action) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(fetchProductsPopular.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
    },
})

export const {addProduct} = productsSlice.actions
export default productsSlice.reducer

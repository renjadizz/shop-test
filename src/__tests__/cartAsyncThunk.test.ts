import cartSlice, {confirmOrder} from "../store/reducers/cartSlice"
import {cartAPI, userAPI} from "../API/API"
import {initialState} from "./cartSlice.test";

jest.mock("../API/API")
const order = {
    userId: 1,
    products: [
        {
            id: 1,
            quantity: 1,
        },
        {
            id: 50,
            quantity: 2,
        },
    ]
}
const postResult = {
    id: 21,
    products: []
}
const mockAllState = {
    cart: {
        cart: [],
        totalPrice: 0,
        status: "null",
        error: null
    },
    categories: {
        categories: [],
        status: "null",
        error: null
    },
    products: {
        total: 0,
        products: [],
        status: "null",
        pageSize: 2,
        currentPage: 1,
        error: null
    },
    search: {
        searchField: ""
    }
}

describe('test cartThunk', () => {
    it('should confirmOrder with resolved response', async () => {
        const userAPIMock = userAPI as jest.Mocked<typeof userAPI>
        const cartAPIMock = cartAPI as jest.Mocked<typeof cartAPI>
        userAPIMock.createUser.mockResolvedValue(Promise.resolve(postResult))
        cartAPIMock.createCart.mockResolvedValue(Promise.resolve({cart: []}))
        const dispatch = jest.fn()
        const thunk = confirmOrder(order)
        await thunk(dispatch, () => (mockAllState), undefined)
        const {calls} = dispatch.mock
        expect(calls).toHaveLength(3)
        expect(calls[0][0].type).toBe('cart/confirmOrder/pending')
        expect(calls[2][0].type).toBe('cart/confirmOrder/fulfilled')
    })
})
describe('test extraReducers for confirmOrder', () => {
    it('should change status with "confirmOrder.pending" action', () => {
        const state = cartSlice(initialState, confirmOrder.pending('', {}))
        expect(state.status).toBe('loading')
        expect(state.error).toBeNull()
    })
    it('should change status with "confirmOrder.fulfilled" action', () => {
        const state = cartSlice(initialState, confirmOrder.fulfilled(initialState,'',{}))
        expect(state).toEqual({
            status:'resolved',
            error:null,
            cart:[],
            totalPrice:0
        })
    })
    it('should change status with "confirmOrder.rejected" action', () => {
        const action = {
            type: confirmOrder.rejected.type,
            payload: 'Server error'
        }
        const state = cartSlice(initialState, action)
        expect(state).toEqual({
            status:'rejected',
            error: 'Server error',
            cart:[],
            totalPrice:0
        })
    })
})
import {
    fetchProduct,
    fetchProductsByCategory, fetchProductsBySearch,
    fetchProductsPopular,
    fetchProductsTotal
} from "../store/reducers/productsSlice"
import {productsAPI} from "../API/API"
jest.mock("../API/API")
const getResult = {
    products: [
        {
            id: 1,
            title: "iPhone 9",
            description: "An apple mobile which is nothing like apple",
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            stock: 94,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "...",
            images: ["...", "...", "..."]
        }
    ],
    total: 100,
    skip: 0,
    limit: 30
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

describe('test productsThunk', () => {
    it('should fetchProductsPopular with resolved response', async () => {
        const productsAPIMock = productsAPI as jest.Mocked<typeof productsAPI>
        productsAPIMock.getProductsByPopularity.mockResolvedValue(Promise.resolve(getResult))
        const {calls} = await dispatchMock(fetchProductsPopular).then((response) => {
            return response
        })
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('products/fetchProducts/pending')
        expect(calls[1][0].type).toBe('products/fetchProducts/fulfilled')
        expect(calls[1][0].payload).toBe(getResult)
    })
    it('should fetchProductsByCategory with resolved response', async () => {
        const productsAPIMock = productsAPI as jest.Mocked<typeof productsAPI>
        productsAPIMock.getProductsByCategory.mockResolvedValue(Promise.resolve(getResult))
        const {calls} = await dispatchMock(fetchProductsByCategory).then((response) => {
            return response
        })
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('products/fetchProductsByCategory/pending')
        expect(calls[1][0].type).toBe('products/fetchProductsByCategory/fulfilled')
        expect(calls[1][0].payload).toBe(getResult)
    })
    it('should fetchProductsTotal with resolved response', async () => {
        const productsAPIMock = productsAPI as jest.Mocked<typeof productsAPI>
        productsAPIMock.getProductsTotal.mockResolvedValue(Promise.resolve(getResult))
        const {calls} = await dispatchMock(fetchProductsTotal).then((response) => {
            return response
        })
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('products/fetchProductsTotal/pending')
        expect(calls[1][0].type).toBe('products/fetchProductsTotal/fulfilled')
        expect(calls[1][0].payload).toBe(getResult)
    })
    it('should fetchProduct with resolved response', async () => {
        const productsAPIMock = productsAPI as jest.Mocked<typeof productsAPI>
        productsAPIMock.getProduct.mockResolvedValue(Promise.resolve(getResult))
        const {calls} = await dispatchMock(fetchProduct).then((response) => {
            return response
        })
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('products/fetchProduct/pending')
        expect(calls[1][0].type).toBe('products/fetchProduct/fulfilled')
        expect(calls[1][0].payload).toBe(getResult)
    })
    it('should fetchProductsBySearch with resolved response', async () => {
        const productsAPIMock = productsAPI as jest.Mocked<typeof productsAPI>
        productsAPIMock.getProductsBySearch.mockResolvedValue(Promise.resolve(getResult))
        const {calls} = await dispatchMock(fetchProductsBySearch).then((response) => {
            return response
        })
        expect(calls).toHaveLength(2)
        expect(calls[0][0].type).toBe('products/fetchProductsBySearch/pending')
        expect(calls[1][0].type).toBe('products/fetchProductsBySearch/fulfilled')
        expect(calls[1][0].payload).toBe(getResult)
    })

})
const dispatchMock = async (fetchAction: any) => {
    const dispatch = jest.fn()
    const thunk = fetchAction()
    await thunk(dispatch, () => (mockAllState), undefined)
    return dispatch.mock
}

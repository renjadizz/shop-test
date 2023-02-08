import productsSlice, {changeCurrentPage, ProductsType} from "../store/reducers/productsSlice";

export const initialState: ProductsType = {
    total: 0,
    products: [],
    status: "null",
    pageSize: 2,
    currentPage: 1,
    error: null
}
describe('test productsSlice', () => {
    it('should return default state', () => {
        const result = productsSlice(undefined, {type: ''})
        expect(result).toEqual(initialState)
    })
    it('should change currentPage with "changeCurrentPage action"', () => {
        const action = {type: changeCurrentPage.type, payload: 5}
        const result = productsSlice(initialState, action)
        expect(result.currentPage).toEqual(5)
    })
})
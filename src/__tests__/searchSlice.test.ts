import searchSlice, {changeSearch} from "../store/reducers/searchSlice";
const initialState = {
    searchField: ""
}
describe('test searchSlice', () => {
    it('should return default state', () => {
        const result = searchSlice(undefined, {type: ''})
        expect(result).toEqual(initialState)
    })
    it('should change searchField with "changeSearch" action', () => {
        const action = {type: changeSearch.type, payload: "searchNew"}
        const result = searchSlice(initialState, action)
        expect(result.searchField).toEqual("searchNew")
    })
})
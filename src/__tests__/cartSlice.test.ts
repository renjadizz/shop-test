import cartSlice, {
    addToCart, CartType,
    changeCart,
    deleteProductInCart,
    emptyCart, ProductTypeWithAmountType
} from "../store/reducers/cartSlice"

export const initialState: CartType = {
    cart: [],
    totalPrice: 0,
    status: "null",
    error: null
}
const productPayload: ProductTypeWithAmountType = {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: [
        "https://i.dummyjson.com/data/products/1/1.jpg"
    ],
    quantity: 1,
    priceSum: 0,
    img: ''
}
const stateWithProduct: CartType = {
    cart: [productPayload],
    totalPrice: 549,
    status: "null",
    error: null
}

const objectPayloadAdd = {...productPayload, quantity: 1, priceSum: productPayload.price}
const objectPayloadChange = {...productPayload, quantity: 5, priceSum: productPayload.price}
const objectPayloadDelete = {id: productPayload.id}

describe('test cartSlice', () => {
    it('should return default state', () => {
        const result = cartSlice(undefined, {type: ''})
        expect(result).toEqual(initialState)
    })
    it('should add new cart with "addToCart" action', () => {
        const action = {type: addToCart.type, payload: objectPayloadAdd}
        const result = cartSlice(initialState, action)
        expect(result.totalPrice).toEqual(549)
        expect(result.cart[0].quantity).toEqual(1)
    })
    it('should add quantity to cart with "addToCart" action', () => {
        const action = {type: addToCart.type, payload: objectPayloadAdd}
        const result = cartSlice(stateWithProduct, action)
        expect(result.totalPrice).toEqual(549 * 2)
        expect(result.cart[0].quantity).toEqual(2)
    })
    it('should change quantity and total price with "changeCart" action', () => {
        const action = {type: changeCart.type, payload: objectPayloadChange}
        const result = cartSlice(stateWithProduct, action)
        expect(result.totalPrice).toEqual(549 * 5)
        expect(result.cart[0].quantity).toEqual(5)
    })
    it('should delete product with "deleteProductInCart" action',()=>{
        const action = {type: deleteProductInCart.type, payload: objectPayloadDelete}
        const result = cartSlice(stateWithProduct, action)
        expect(result.cart.length).toEqual(0)
        expect(result.totalPrice).toEqual(0)
    })
    it('should empty cart with "emptyCart" action',()=>{
        const action = {type: emptyCart.type}
        const result = cartSlice(stateWithProduct, action)
        expect(result.cart.length).toEqual(0)
        expect(result.totalPrice).toEqual(0)
    })
})
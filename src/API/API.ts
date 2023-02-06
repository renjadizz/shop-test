import axios from "axios"

const instance = axios.create({
    method: 'GET',
    baseURL: 'https://dummyjson.com/'
})

export const productsAPI = {
    getProductsByPopularity(): Promise<any> {
        return instance.get('products/search?q=phone')
            .then(response => {
                return response.data
            })
    }
}
export const categoriesAPI = {
    getAllCategories(): Promise<any> {
        return instance.get('products/categories')
            .then(response => {
                return response.data
            })
    }
}
export const cartAPI = {
    createCart(cart: any): Promise<any> {
        return instance.post('carts/add', {
            ...cart
        }).then(response => {
            return response.data
        })
    }
}
export const userAPI = {
    createUser(user: any): Promise<any> {
        return instance.post('users/add', {
            ...user
        }).then(response => {
            return response.data
        })
    }
}



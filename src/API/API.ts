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
    },
    getProductsByCategory(category: any, pageSize: number, toSkip: number): Promise<any> {
        return instance.get(`products/category/${category}?limit=${pageSize}&skip=${toSkip}`)
            .then(response => {
                return response.data
            })
    },
    getProductsTotal(): Promise<any> {
        return instance.get(`products?limit=1&select=total`)
            .then(response => {
                return response.data
            })
    },
    getProduct(productId: string): Promise<any> {
        return instance.get(`products/${productId}`)
            .then(response => {
                return response.data
            })
    },
    getProductsBySearch(searchField: string, pageSize: number, toSkip: number): Promise<any> {
        return instance.get(`products/search?q=${searchField}&limit=${pageSize}&skip=${toSkip}`)
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



import {useEffect} from "react";
import {fetchProductsPopular} from "../store/reducers/productsSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import {ProductsRows} from "../components/products/ProductsRows";

export const Home = () => {
    const dispatch = useAppDispatch()
    const productsAll = useAppSelector(state => state.products)
    useEffect(() => {
        dispatch(fetchProductsPopular())
    }, [])

    return (
        <ProductsRows products={productsAll}/>
    )
}
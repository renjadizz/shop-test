import {useEffect} from "react";
import {fetchProductsPopular} from "../store/reducers/productsSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import {ProductsRows} from "../components/products/ProductsRows";
import {selectProducts} from "../store/selectors";

export const Home = () => {
    const dispatch = useAppDispatch()
    const productsAll = useAppSelector(selectProducts)
    useEffect(() => {
        dispatch(fetchProductsPopular())
    }, [])

    return (
        <ProductsRows products={productsAll}/>
    )
}
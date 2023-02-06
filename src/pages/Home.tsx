import {useEffect} from "react";
import {fetchProductsPopular, ProductType} from "../store/reducers/productsSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import {ProductsList} from "../components/products/ProductsList";
import {Box} from "@mui/material";

export const Home = () => {
    const dispatch = useAppDispatch()
    const productsAll = useAppSelector(state => state.products.products)
    useEffect(() => {
        dispatch(fetchProductsPopular())
    }, [])

    return (
        <Box sx={{m: 5}}>
            {productsAll.map((el: ProductType) => (
                <ProductsList key={el.id} product={el}/>
            ))}
        </Box>
    )
}
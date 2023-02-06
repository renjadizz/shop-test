import {useEffect} from "react";
import {fetchProductsPopular, ProductType} from "../store/reducers/productsSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import {ProductsList} from "../components/products/ProductsList";
import {Box, CircularProgress, Typography} from "@mui/material";

export const Home = () => {
    const dispatch = useAppDispatch()
    const productsAll = useAppSelector(state => state.products)
    useEffect(() => {
        dispatch(fetchProductsPopular())
    }, [])

    return (
        <Box sx={{m: 5}}>
            {productsAll.status === "loading" &&
                <Box alignItems="center" display="flex" justifyContent="center"><CircularProgress/></Box>}
            {productsAll.status === "rejected" && <Box alignItems="center" display="flex"
                                                       justifyContent="center">
                <Typography>{productsAll.error}</Typography>
            </Box>}
            {productsAll.status === "resolved" && productsAll.products.map((el: ProductType) => (
                <ProductsList key={el.id} product={el}/>
            ))}
        </Box>
    )
}
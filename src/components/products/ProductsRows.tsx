import {Box, CircularProgress, Typography} from "@mui/material";
import {ProductsType, ProductType} from "../../store/reducers/productsSlice";
import {ProductsList} from "./ProductsList";

type ProductsRowsType = {
    products: ProductsType
}
export const ProductsRows = ({products}: ProductsRowsType) => {
    return (
        <Box sx={{m: 5}}>
            {products.status === "loading" &&
                <Box alignItems="center" display="flex" justifyContent="center"><CircularProgress/></Box>}
            {products.status === "rejected" && <Box alignItems="center" display="flex"
                                                    justifyContent="center">
                <Typography>{products.error}</Typography>
            </Box>}
            {products.status === "resolved" && products.products.map((el: ProductType) => (
                <ProductsList key={el.id} product={el}/>
            ))}
        </Box>
    )
}
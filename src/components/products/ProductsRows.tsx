import {Box, CircularProgress, Pagination, Typography} from "@mui/material";
import {ProductsType, ProductType} from "../../store/reducers/productsSlice";
import {ProductsList} from "./ProductsList";

type ProductsRowsType = {
    products: ProductsType,
    countNumber?: number,
    onChangeCallback?: any
}
export const ProductsRows = ({products, countNumber, onChangeCallback}: ProductsRowsType) => {
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
            {products.status === "resolved" && countNumber !== undefined &&
                <Pagination page={products.currentPage} count={countNumber} onChange={onChangeCallback}
                            sx={{float: "right"}} size="small"/>
            }
        </Box>
    )
}
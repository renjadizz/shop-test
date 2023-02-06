import {ProductListCart} from "./ProductListCart";
import {ProductType} from "../../store/reducers/productsSlice";
import {Link} from "react-router-dom";
import {Box, Grid, Typography} from "@mui/material";
import {Image} from "mui-image";

export type ProductPropsType = {
    product: ProductType
}
export const ProductsList = ({product}: ProductPropsType) => {

    return (
        <>
            <Box>
                <Grid container>
                    <Grid item xs={2}><Image width={120} height={120} fit={"contain"} src={product.thumbnail}/></Grid>
                    <Grid item xs={6}>
                        <Typography sx={{paddingTop: "15px"}} variant={"h6"}><Link
                            to={`/product/${product.id}`}>{product.title}</Link></Typography>
                        <Typography>{product.description}</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{textAlign: "center"}}>
                        <ProductListCart product={product}/>
                    </Grid>
                </Grid>
            </Box>
            <hr/>
        </>
    )
}
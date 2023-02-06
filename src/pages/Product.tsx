import {useParams} from "react-router-dom";
import {Box, Button, CircularProgress, Grid, Typography} from "@mui/material";
import {useEffect} from "react";
import {fetchProduct} from "../store/reducers/productsSlice";
import {Image} from 'mui-image'
import Carousel from "react-material-ui-carousel/dist/components/Carousel";
import {addToCart} from "../store/reducers/cartSlice";
import {useAppDispatch, useAppSelector} from "../store/store";

export const Product = () => {
    const {productId} = useParams()
    const productsAll = useAppSelector(state => state.products)
    const product = productsAll.products[0]
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (productId) {
            dispatch(fetchProduct(productId))
        }
    }, [])
    const handleClick = () => {
        const productWithAmount = {...product, quantity: 1, priceSum: product?.price}
        dispatch(addToCart(productWithAmount))
    }
    return (
        <>
            {productsAll.status === "loading" &&
                <Box alignItems="center" display="flex" justifyContent="center"><CircularProgress/></Box>}
            {productsAll.status === "rejected" && <Box alignItems="center" display="flex"
                                                       justifyContent="center">
                <Typography>{productsAll.error}</Typography>
            </Box>}
            {product && productsAll.status === 'resolved' && <>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Carousel stopAutoPlayOnHover height={400}>
                            {product.images.map((img, i) => (
                                <Image key={i} src={img} fit={"contain"}/>
                            ))}
                        </Carousel>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4">{product.title}</Typography>
                        <Box sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: 2,
                            p: 2,
                            minWidth: 300,
                        }}>
                            <Typography variant="h5" sx={{m: "5px 0"}}>About Product</Typography>
                            <Typography sx={{m: "2px"}}>{product.description}</Typography>
                            <Box sx={{textAlign: "center"}}>
                                <Button size="small" variant="outlined" sx={{m: "5px"}}>Buy</Button>
                                <Button size="small" onClick={handleClick} variant="outlined" sx={{m: "5px"}}>Add to
                                    Cart</Button>
                            </Box>
                            <Typography align={"right"}>Price: {product.price}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </>}
        </>
    )
}
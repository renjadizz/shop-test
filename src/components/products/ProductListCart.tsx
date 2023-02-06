import {useDispatch} from "react-redux";
import {Box, Button, Typography} from "@mui/material";
import {addToCart} from "../../store/reducers/cartSlice";
import {ProductPropsType} from "./ProductsList";

export const ProductListCart = ({product}: ProductPropsType) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        const productWithAmount = {...product, quantity: 1, priceSum: product.price}
        dispatch(addToCart(productWithAmount))
    }
    return (
        <Box sx={{}}>
            <Typography>Price: {product.price}</Typography>
            <Typography>In Stock: {product.stock}</Typography>
            <Box>
                <Button size="small" variant="outlined" sx={{m: "5px"}}>Buy</Button>
                <Button size="small" onClick={handleClick} variant="outlined" sx={{m: "5px"}}>Add to Cart</Button>
            </Box>
        </Box>
    )
}
import {useDispatch} from "react-redux";
import {Box, Button, Typography} from "@mui/material";
import {addToCart} from "../../store/reducers/cartSlice";
import {ProductPropsType} from "./ProductsList";
import {useNavigate} from "react-router-dom";

export const ProductListCart = ({product}: ProductPropsType) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handeClick = () => {
        const productWithAmount = {...product, quantity: 1, priceSum: product.price}
        dispatch(addToCart(productWithAmount))
    }
    const handleClickAdd = () => {
        handeClick()
    }
    const handleClickBuy = () => {
        handeClick()
        navigate('/cart')
    }
    return (
        <Box sx={{}}>
            <Typography>Price: {product.price}</Typography>
            <Typography>In Stock: {product.stock}</Typography>
            <Box>
                <Button size="small" onClick={handleClickBuy} variant="outlined" sx={{m: "5px"}}>Buy</Button>
                <Button size="small" onClick={handleClickAdd} variant="outlined" sx={{m: "5px"}}>Add to Cart</Button>
            </Box>
        </Box>
    )
}
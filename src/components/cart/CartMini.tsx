import {useAppSelector} from "../../store/store";
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const CartMini = () => {
    const cartInfo = useAppSelector(state => state.cart)
    return (
        <>
            <Link to={"/cart"}><Typography variant={"h6"}>My Cart</Typography></Link>
            <Typography>Items: {cartInfo.cart.length}</Typography>
            <Typography>Total Amount: {cartInfo.totalPrice}</Typography>
        </>
    )
}
import {useAppSelector} from "../../store/store";
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {selectCart} from "../../store/selectors";

export const CartMini = () => {
    const cartInfo = useAppSelector(selectCart)
    return (
        <>
            <Link to={"/cart"}><Typography variant={"h6"}>My Cart</Typography></Link>
            <Typography>Items: {cartInfo.cart.length}</Typography>
            <Typography>Total Amount: {cartInfo.totalPrice}</Typography>
        </>
    )
}
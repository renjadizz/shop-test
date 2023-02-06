import {Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const CartMini = () => {

    return (
        <>
            <Link to={"/cart"}><Typography variant={"h6"}>My Cart</Typography></Link>
            <Typography>Items: </Typography>
            <Typography>Total Amount: </Typography>
        </>
    )
}
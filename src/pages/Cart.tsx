import {useAppDispatch, useAppSelector} from "../store/store";
import {changeCart, deleteProductInCart} from "../store/reducers/cartSlice";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import {
    Grid, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import {Image} from 'mui-image'

export const Cart = () => {
    const cartInfo = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = Number(event.target.value)
        const inputId = Number(event.target.id)
        const productIndex = cartInfo.cart.findIndex((product) => product.id === inputId)
        if (inputValue === 0) {
            inputValue = 1
        } else if (inputValue > cartInfo.cart[productIndex].stock) {
            inputValue = cartInfo.cart[productIndex].stock
        }
        const [id, quantity] = [inputId, inputValue]
        dispatch(changeCart({id, quantity}))
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="cart table">
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>Title</TableCell>
                        <TableCell align={'center'}>Stock</TableCell>
                        <TableCell align={'center'}>Amount</TableCell>
                        <TableCell align={'center'}>Price</TableCell>
                        <TableCell align={'center'}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartInfo.cart.map(product => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Image fit={"contain"} src={product.thumbnail}/>
                                    </Grid>
                                    <Grid display={"flex"} item xs={10} sx={{alignItems: "center", pl: 2}}>
                                        <Typography variant={"h5"}>{product.title}</Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell><Typography mx={2} variant={"h5"}>{product.stock}</Typography></TableCell>
                            <TableCell align={'center'}>
                                <TextField
                                    id={product.id.toString()}
                                    size="small"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    value={product.quantity}
                                    onChange={handleChangeAmount}
                                /></TableCell>
                            <TableCell><Typography mx={2} variant={"h5"}>{product.priceSum}</Typography></TableCell>
                            <TableCell>
                                <IconButton color="error" onClick={() => {
                                    dispatch(deleteProductInCart({id: product.id}))
                                }}>
                                    <CloseIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Typography p={1} align={"right"} variant={"h5"}>Total
                Sum: <strong>{cartInfo.totalPrice}</strong></Typography>
        </TableContainer>
    )
}
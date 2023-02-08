import {useAppDispatch, useAppSelector} from "../store/store";
import {changeCart, confirmOrder, deleteProductInCart} from "../store/reducers/cartSlice";
import React, {useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button, CircularProgress, Divider,
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
import {Link} from "react-router-dom";
import {selectCart} from "../store/selectors";

export const Cart = () => {
    const cartInfo = useAppSelector(selectCart)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (cartInfo.status === "resolved") {
            setFirstName("")
            setLastName("")
            setPhone("")
        }
    }, [cartInfo])
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
    const handleClickConfirmOrder = (event: any) => {
        event.preventDefault()
        const userInfo = {firstName, lastName, phone}
        dispatch(confirmOrder(userInfo))
    }

    return (
        <>
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
                                            <Typography variant={"h5"}><Link
                                                to={`/product/${product.id}`}
                                                style={{textDecoration: 'none'}}>{product.title}</Link></Typography>
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
            <Divider/>
            <Paper sx={{textAlign: "center", my: 5, p: 5, alignItems: "center"}}>
                <form onSubmit={handleClickConfirmOrder}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Typography>Name: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="inputName" size={"small"} required value={firstName}
                                       onChange={e => setFirstName(e.target.value)}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Surname: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="inputSurname" size={"small"} required value={lastName}
                                       onChange={e => setLastName(e.target.value)}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Phone: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="inputPhone" size={"small"} inputProps={{type: "tel"}} required value={phone}
                                       onChange={e => setPhone(e.target.value)}/>
                        </Grid>
                    </Grid>
                    <Button disabled={cartInfo.totalPrice === 0 || cartInfo.status === "loading"} size="small"
                            type="submit" variant="contained"
                            sx={{m: "5px", float: "right"}}>Confirm an order</Button>
                </form>
            </Paper>
            {cartInfo.status === "loading" &&
                <Box alignItems="center" display="flex" justifyContent="center"><CircularProgress/></Box>}
        </>
    )
}
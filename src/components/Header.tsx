import logo from "../files/website_logo.png"
import {CartMini} from "../components/cart/CartMini"
import {Box, Grid, TextField, Typography} from "@mui/material";
import {Image} from "mui-image";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/store";
import {useState} from "react";
import {changeSearch} from "../store/reducers/searchSlice";
import {selectSearchField} from "../store/selectors";

export const Header = () => {
    const dispatch = useAppDispatch()
    const searchInitial = useAppSelector(selectSearchField)
    const [searchString, setSearchString] = useState(searchInitial)
    const navigate = useNavigate()
    const handleSearchChange = (event: any) => {
        setSearchString(event.target.value)
    }
    const handleSearchKeyPress = (event: any) => {
        if (event.keyCode == 13) {
            dispatch(changeSearch(searchString))
            navigate('/search')
        }
    }
    return (
        <>
            <Box sx={{display: "flex"}}>
                <Grid container width={"20%"}>
                    <Grid item xs={6}>
                        <Link
                            to={`/`}><Image width={100} height={100} src={logo}/></Link>
                    </Grid>
                    <Grid item xs={6} sx={{display: "flex"}}>
                        <Typography variant={"h5"} align={"center"} sx={{alignSelf: "center"}}>My Shop</Typography>
                    </Grid>
                </Grid>
                <Box width={"60%"} sx={{
                    alignSelf: "center",
                    alignContent: "center",
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <TextField margin="normal" size="medium" id="outlined-basic" label="Search"
                               variant="outlined" value={searchString} onChange={handleSearchChange}
                               onKeyDown={handleSearchKeyPress}/>
                </Box>
                <Grid container width={"20%"}>
                    <Grid item xs={2} sx={{p: "5px"}}>
                        <ShoppingBasketIcon/>
                    </Grid>
                    <Grid item xs={10}>
                        <CartMini/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
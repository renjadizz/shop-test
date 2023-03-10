import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {fetchCategories} from "../store/reducers/categoriesSlice";
import {Link} from "react-router-dom";
import {useAppSelector} from "../store/store";
import {Box, CircularProgress, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import {selectCategories} from "../store/selectors";

export function ListItemLink(props: any) {
    const {primary, to} = props
    return (
        <ListItemButton alignItems={"center"} component={Link} to={to}>
            <ListItemText primary={primary} sx={{m: "0px"}}/>
        </ListItemButton>
    )
}

export const Categories = () => {
    const dispatch = useDispatch()
    const categoriesAll = useAppSelector(selectCategories)
    const [open, setOpen] = useState(true)
    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    return (
        <Box>
            <ListItemButton
                alignItems="center"
                onClick={() => setOpen(!open)}
                sx={{
                    px: 3,
                    pb: 0,
                    mt: 3,
                    '&:hover, &:focus': {'& svg': {opacity: open ? 1 : 0}}
                }}>
                <ListItemText
                    primary="Categories"
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '2px',
                        mb: '2px'
                    }}/>
                <KeyboardArrowDown
                    sx={{
                        mr: 0,
                        opacity: 0,
                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                        alignContent: 'center'
                    }}/>
            </ListItemButton>
            {categoriesAll.status === 'loading' && <CircularProgress/>}
            {categoriesAll.status === 'rejected' && <Typography>{categoriesAll.error}</Typography>}
            {open && categoriesAll.status === 'resolved' &&
                <List sx={{width: '100%'}} aria-label="categories">
                    {categoriesAll.categories.map((el: string) => (
                        <ListItemLink key={el} primary={el} to={`/category/${el}`}/>
                    ))}
                </List>
            }
        </Box>
    )
}



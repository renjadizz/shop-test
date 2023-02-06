import React from 'react'
import {Categories} from "../components/Categories";
import {Header} from "../components/Header";
import {Box, Container, Grid} from "@mui/material";
import {Outlet} from "react-router-dom";

function Base() {
    return (
        <Container>
            <Box><Header/></Box>
            <Grid container>
                <Grid item xs={2}>
                    <Categories/>
                </Grid>
                <Grid item xs={10}>
                    <Outlet/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Base

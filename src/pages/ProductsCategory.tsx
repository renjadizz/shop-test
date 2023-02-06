import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {
    changeCurrentPage,
    fetchProductsByCategory,
    fetchProductsTotal
} from "../store/reducers/productsSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import {Pagination} from "@mui/material";
import {ProductsRows} from "../components/products/ProductsRows";

export const ProductsCategory = () => {
    const dispatch = useAppDispatch()
    const productsByCategory = useAppSelector(state => state.products)
    const {categoryName} = useParams()
    useEffect(() => {
        dispatch(fetchProductsTotal)
    }, [])
    useEffect(() => {
        dispatch(fetchProductsByCategory(categoryName))
    }, [productsByCategory.currentPage])
    useEffect(() => {
        dispatch(changeCurrentPage(1))
        dispatch(fetchProductsByCategory(categoryName))
    }, [categoryName])
    const handlePaginationChange = (event: any, page: number) => {
        dispatch(changeCurrentPage(page))
    }
    let countNumber = Math.ceil(productsByCategory.total / productsByCategory.pageSize)
    return (
        <>
            <ProductsRows products={productsByCategory}/>
            <Pagination page={productsByCategory.currentPage} count={countNumber} size="small"
                        onChange={handlePaginationChange} sx={{float: "right"}}/>
        </>
    )
}

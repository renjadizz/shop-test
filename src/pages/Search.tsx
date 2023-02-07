import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/store";
import {changeCurrentPage, fetchProductsBySearch} from "../store/reducers/productsSlice";
import {ProductsRows} from "../components/products/ProductsRows";

export const Search = () => {
    const dispatch = useAppDispatch()
    const searchField = useAppSelector(state => state.search.searchField)
    const productsBySearch = useAppSelector(state => state.products)
    useEffect(() => {
        dispatch(changeCurrentPage(1))
        dispatch(fetchProductsBySearch(searchField))
    }, [searchField])
    const handlePaginationChange = (event: any, page: number) => {
        dispatch(changeCurrentPage(page))
        dispatch(fetchProductsBySearch(searchField))
    }
    let countNumber = Math.ceil(productsBySearch.total / 10)
    return (
        <>
            <ProductsRows products={productsBySearch} countNumber={countNumber}
                          onChangeCallback={handlePaginationChange}/>
        </>
    )
}
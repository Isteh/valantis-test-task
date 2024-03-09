import React, { useEffect, useState } from 'react';
import styles from './App.module.scss'
import { getProductsIds } from '../../utils/getProductsIds';
import Pagination from '../blocks/Pagination/Pagination';
import ProductList from '../blocks/ProductList/ProductList';
import Loading from '../ui/Loading/Loading';
import Filters from '../blocks/Filters/Filters';
import { IFilters } from '../../Interfaces/filters';

const PRODUCTS_ON_PAGE = 50

function App() {
  const [productIds, setProductIds] = useState<Array<string>>();
  const [currentProductIds, setCurrentProductIds] = useState<Array<string>>()
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<IFilters | null>(null)

  useEffect(() => {
    getProductsIds((data: Array<string>) => {
      setProductIds(data)
    }, filters)
  }, [filters])

  useEffect(() => {
    setCurrentProductIds(productIds?.slice(0, PRODUCTS_ON_PAGE))
  }, [productIds])

  return <div className={styles.catalog}>
    <header>
      <h1 className={styles.title}> Каталог: </h1>
    </header>
    <Filters onChange={(data) => {
      if (filters !== data) {
        setFilters(data)
        setCurrentPage(1)
      }
    }} className={styles.filters} />

    {productIds && currentProductIds ?
      <>

        <ProductList productIds={currentProductIds} className={styles.productList} />

        <Pagination classList={styles.pagination} curentPage={currentPage}
          maxPage={Math.ceil(productIds.length / PRODUCTS_ON_PAGE)}
          numberPagesDisplayed={2}
          onClickButton={(e) => {
            const pageNumber = Number(e.currentTarget.getAttribute('data-pagenumber'))
            if (pageNumber && !isNaN(pageNumber)) {
              window.scrollTo(0, 0)
              setCurrentPage(pageNumber)
              setCurrentProductIds(productIds?.slice(pageNumber * PRODUCTS_ON_PAGE, (pageNumber + 1) * PRODUCTS_ON_PAGE))
            }
          }} />
      </>
      : <Loading className={styles.isLoading} />
    }

  </div>

}

export default App;

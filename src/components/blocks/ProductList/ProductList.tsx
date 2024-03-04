import { FC, useEffect, useState } from 'react'
import styles from './ProductList.module.scss'
import Loading from '../../ui/Loading/Loading'
import { getProductsData } from '../../../utils/getProductsData'
import { IProduct } from '../../../Interfaces/product'
import ProductItem from '../../ui/ProductItem/ProductItem'

type TypeProductListProps = {
    productIds: Array<string>

    className?: string
}


const ProductList: FC<TypeProductListProps> = ({ productIds, className }) => {
    const [products, setProducts] = useState<Array<IProduct>>()

    useEffect(() => {
        setProducts(undefined)
        getProductsData(productIds,
            (data) => setProducts(data),
            () => getProductsData(productIds, (data) => setProducts(data)))
    }, [productIds])

    return products ?
        products.length ?
            <ul className={`${styles.productList} ${className ? className : ''}`}>
                {products.map((product) => <li key={product.id}>
                    <ProductItem product={product} />
                </li>)}
            </ul>
            :
            <div className={`${styles.notEnought}  ${className ? className : ''}`}>Кажется, товаров нет!</div>
        :
        <Loading className={styles.isLoading} />
}

export default ProductList
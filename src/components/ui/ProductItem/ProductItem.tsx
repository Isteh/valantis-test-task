import { FC } from 'react'
import { IProduct } from '../../../Interfaces/product'
import styles from './ProductItem.module.scss'

type TypeProductItemProps = {
    product: IProduct
}

const ProductItem: FC<TypeProductItemProps> = ({ product }) => {
    return <div className={styles.card}>
        <span className={styles.productTitle}>{product.product}</span>
        {
            product.brand &&
            <span className={styles.propertyContainer}>
                <span >
                    Бренд:
                </span>
                <span className={styles.propertyValue}>
                    {product.brand}
                </span>
            </span>
        }
        <span className={styles.propertyContainer}>
            <span >
                Цена:
            </span>
            <strong className={styles.propertyValue}>
                {product.price}
            </strong>
        </span>
    </div>
}

export default ProductItem
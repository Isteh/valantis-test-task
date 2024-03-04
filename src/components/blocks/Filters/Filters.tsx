import { FC, FormEvent, useEffect, useState } from 'react'
import Input from '../../ui/Input/Input'
import { getProductsFields } from '../../../utils/getProductsFields'
import Loading from '../../ui/Loading/Loading'
import Select from '../../ui/Select/Select'
import styles from './Filters.module.scss'
import { IFilters } from '../../../Interfaces/filters'

type TypeMinMaxPrice = {
    min: number
    max: number
}

type TypeFiltersProps = {
    onChange: (data: IFilters) => void
    className?: string
}

const FILTERS = {
    NAME: 'Названию',
    PRICE: 'Цене',
    BRAND: 'Бренду'
}

const extractFormData = (formData: FormData, currentFilter: string) => {
    switch (currentFilter) {
        case FILTERS.NAME:
            const productFilter = formData.get('nameFilter');
            if (productFilter) return { productFilter: productFilter.toString() }
            break
        case FILTERS.PRICE:
            const priceFilter = formData.get('priceFilter');
            if (priceFilter) return { priceFilter: Number(priceFilter) }
            break
        case FILTERS.BRAND:
            const brandFilter = formData.get('brandFilter');
            if (brandFilter) return { brandFilter: brandFilter.toString() }
            break
    }

    return {}
}



const Filters: FC<TypeFiltersProps> = ({ onChange, className }) => {
    const [brands, setBrands] = useState<Array<string>>()
    const [minMaxPrice, setMinMaxPrice] = useState<TypeMinMaxPrice>()
    const [currentFilter, setCurrentFilter] = useState(FILTERS.NAME)

    const formEventHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        onChange(extractFormData(formData, currentFilter))
    }

    useEffect(() => {
        getProductsFields('brand', (data) => {
            const stringData = data.map(el => el.toString())
            setBrands(stringData)
        },
            () =>
                getProductsFields('brand', (data) => {
                    const stringData = data.map(el => el.toString())
                    setBrands(stringData)
                })
        )
        getProductsFields('price', (data) => {
            const numberData = data.map(el => Number(el))
            setMinMaxPrice({
                min: Math.min(...numberData),
                max: Math.max(...numberData)
            })
        },
            () =>
                getProductsFields('price', (data) => {
                    const numberData = data.map(el => Number(el))
                    setMinMaxPrice({
                        min: Math.min(...numberData),
                        max: Math.max(...numberData)
                    })
                })
        )
    }, [])

    return <div className={`${styles.filtersForm} ${className ? className : ''}`}
    >
        <h2 className={styles.title}>Фильтровать по: </h2>

        <Select options={Object.values(FILTERS)}
            name='currentFilter'
            defaultValue={FILTERS.NAME}
            onChange={(e) => {
                setCurrentFilter(e.currentTarget.value)
                onChange({})
            }} />

        <form name='catalog_filters'
            onChange={formEventHandler}
            onSubmit={formEventHandler}>
            {brands && minMaxPrice ?
                (() => {
                    switch (currentFilter) {
                        case FILTERS.NAME:
                            return <Input type='search'
                                name='nameFilter'
                                placeholder='название'
                                key={'search'}
                            />
                        case FILTERS.BRAND:
                            return <Select options={brands}
                                name='brandFilter'
                                withZeroElement
                                key={'brand'}
                            />
                        case FILTERS.PRICE:
                            return <Input type='number'
                                name='priceFilter'
                                placeholder='цена'
                                min={minMaxPrice.min}
                                max={minMaxPrice.max}
                                key={'price'}
                            />
                        default:
                            return <></>
                    }
                })() : <Loading />}
        </form>
    </div>
}

export default Filters
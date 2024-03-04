import { FC, ReactEventHandler } from 'react'
import PaginationItem from '../PaginationItem/PaginationItem'
import styles from './Pagination.module.scss'

type TypePaginationProps = {
    curentPage: number
    numberPagesDisplayed: number
    maxPage: number
    onClickButton: ReactEventHandler<HTMLButtonElement>
    classList?: string
}

const Pagination: FC<TypePaginationProps> = ({ curentPage, numberPagesDisplayed, maxPage, onClickButton, classList }) => {
    let pageArray: Array<number> = []
    for (let i = curentPage - numberPagesDisplayed; i <= curentPage + numberPagesDisplayed; i++) {
        if (i > 0 && i <= maxPage) {
            pageArray = [...pageArray, i]
        }
    }
    return <ol className={`${classList ? classList : ''} ${styles.paginationList}`}>
        {
            curentPage - numberPagesDisplayed >= 2 &&
            <>
                <li><PaginationItem content={1} onClick={onClickButton} /></li>
                <li><PaginationItem content={'...'} /></li>
            </>
        }
        {
            pageArray.map((item, index) =>
                <li key={index}>
                    <PaginationItem content={item}
                        onClick={onClickButton}
                        {...curentPage === item && { isCurrent: true }} />
                </li>
            )
        }
        {
            curentPage + numberPagesDisplayed < maxPage - 1 &&
            <>
                <li><PaginationItem content={'...'} /></li>
                <li><PaginationItem content={maxPage} onClick={onClickButton} /></li>
            </>
        }
    </ol>
}

export default Pagination
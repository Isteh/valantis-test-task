import { FC, ReactEventHandler } from 'react'
import styles from './PaginationItem.module.scss'

type TypePaginationItemProps = {
    content: number | string
    isCurrent?: boolean
    onClick?: ReactEventHandler<HTMLButtonElement>
    classList?: string
}

const PaginationItem: FC<TypePaginationItemProps> = ({ content, classList, isCurrent, onClick }) => {
    return isNaN(Number(content)) ?
        <span className={`${classList ? classList : ''} ${styles.item} ${styles.current}`}>
            {content}
        </span>
        :
        <button type='button'
            className={`${classList ? classList : ''} ${styles.item} ${isCurrent ? styles.current : ''}`}
            {...onClick && { onClick: onClick }}
            data-pagenumber={content}
            {...isCurrent && { disabled: true }}
        >
            {content}
        </button>
}

export default PaginationItem
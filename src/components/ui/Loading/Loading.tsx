import { FC, ReactNode } from 'react'
import styles from './Loading.module.scss'

type TypeLoadingProps = {
    children?: ReactNode;
    className?: string
}

const Loading: FC<TypeLoadingProps> = ({ children, className }) => {
    return <div className={`${styles.loading} ${className ? className : ''}`}>
        {children}
    </div>
}

export default Loading
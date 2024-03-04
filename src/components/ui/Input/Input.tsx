import { FC } from 'react'
import styles from './Input.module.scss'

type TypeInputProps = {
    type: 'search' | 'number' | 'text'
    name: string
    textLabel?: string
    min?: number
    max?: number
    placeholder?: string
    className?: string
}


const Input: FC<TypeInputProps> = ({ type, className, placeholder, name, textLabel, min, max }) => {
    return <label className={`${className ? className : ''} `}>
        {textLabel ? <span>{textLabel}</span> : ''}
        <input name={name}
            type={type}
            placeholder={placeholder}
            className={styles.input}
            {...min && type === 'number' && { min: min }}
            {...max && type === 'number' && { max: max }}
        />
    </label>
}

export default Input
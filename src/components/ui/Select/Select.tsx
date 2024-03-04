import { FC, ReactEventHandler } from 'react'
import styles from './Select.module.scss'

type TypeSelectProps = {
    name: string
    options: Array<string>
    onChange?: ReactEventHandler<HTMLSelectElement>
    defaultValue?: string
    withZeroElement?: boolean
    textLabel?: string
    isMultiple?: boolean
    className?: string
}


const Select: FC<TypeSelectProps> = ({ className, name, textLabel, options, isMultiple = false, withZeroElement = false, defaultValue, onChange }) => {
    return <label className={`${className ? className : ''} ${styles.label}`}>
        {textLabel ? <span>{textLabel}</span> : ''}
        <select name={name}
            className={styles.select}
            {...isMultiple && { multiple: true }}
            {...defaultValue && { defaultValue: defaultValue }}
            {...onChange && { onChange: onChange }}>

            {withZeroElement && <option value=''>Не имеет значения</option>}
            {options.map((item) => <option key={item} value={item}>
                {item}
            </option>)}
        </select>
    </label>
}

export default Select
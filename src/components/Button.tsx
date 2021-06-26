import { ButtonHTMLAttributes } from 'react'
import 'styles/button.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}

function Button({ children, isOutlined = false, ...rest }: Props) {
    return (
        <button 
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button

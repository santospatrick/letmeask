import { ButtonHTMLAttributes } from 'react'
import 'styles/button.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, ...rest }: Props) {
    return (
        <button className="button" {...rest}>
            {children}
        </button>
    )
}

export default Button

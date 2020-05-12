import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classnames from 'classnames'
export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
} 

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}


interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode,
    href?: string
}

// 别名  添加原有属性 '&'表示混合属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>



const Button: React.FC<ButtonProps> = (props) => {

    const {
        btnType,
        disabled,
        className,
        size,
        children,
        href,
        ...restProps
    } = props

    // btn, btn-lg, btn-primary

    const classes = classnames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })

   if (btnType === 'link' && href) {
       return (
           <a
            className={classes}
            href={href}
            {...restProps}
           >
               {children}
           </a>
       )
   } else {
       return (
           <button
            className={classes}
            disabled={disabled}
            {...restProps}
           >
               {children}
           </button>
       )
   }
}
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button
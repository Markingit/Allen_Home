import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void

export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[]
}
// 创建context
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback,
    mode?: MenuMode,
    defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> =(props) => {
    const {className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
    const [ currentActive, setActive ] = useState(defaultIndex)
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode ==='vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    const handleClick = (index: string) => {
        setActive(index)
        if(onSelect) {
            onSelect(index)
        }
    }
    // 传递给子组件
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }
    // menu 包裹的menuitem判断
    const renderChldren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type

            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // return child
                // 去掉index
                return React.cloneElement( childElement, {
                    index: index.toString()
                })
            } else {
                console.error('warning: Menu has a child which is not a MenuItem component')
            }
        })
    }

    // end
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {/* {children} */}
                {renderChldren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}


export default Menu
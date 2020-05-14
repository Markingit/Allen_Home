import React from 'react';
// import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex='0' onSelect={(index) => {console.log(index)}} mode="vertical" defaultOpenSubMenus={['2']}>
          <MenuItem>link 0</MenuItem>
          <MenuItem>link 1</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>link 2</MenuItem>
        </Menu>

        {/* <Button onClick={(e) => {e.stopPropagation(); alert('123')}}>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} >Hello</Button>
        <Button btnType={ButtonType.Link} href = "http://www.baidu.com" target="_blank">Link</Button> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

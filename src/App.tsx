import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button onClick={(e) => {e.stopPropagation(); alert('123')}}>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} >Hello</Button>
        <Button btnType={ButtonType.Link} href = "http://www.baidu.com" target="_blank">Link</Button>
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

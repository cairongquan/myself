import './App.scss';

import Background from './bg'
import MyInfo from './components/info'

function App() {
  return (
    <div className="App">
      <div className='out-app'>
        <Background>
          <MyInfo></MyInfo>
        </Background>
      </div>
    </div>
  );
}

export default App;

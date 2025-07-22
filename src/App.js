import './App.scss';


import MyInfo from './components/info'
import Editor from './views/editor';

import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MyInfo />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
  );
}

export default App;

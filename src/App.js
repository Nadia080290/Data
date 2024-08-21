import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import InfoGeo from './components/Geo';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';


function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<SignIn/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/geo" element={<InfoGeo/>} />
        <Route path="/about" element={<About/>} />
        <Route element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
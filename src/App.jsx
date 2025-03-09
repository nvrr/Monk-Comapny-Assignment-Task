

import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
  
} from "react-router-dom";

import HomePage from './pages/HomePage';
import NextForm from './pages/NextForm';

function App() {

 
  return (
    <Router>
     <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/nextform' element={<NextForm/>} />
     </Routes>
    </Router>
  )
}

export default App

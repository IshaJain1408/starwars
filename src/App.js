

// import {useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Planets from './components/Planets/Planets';
import People from './components/people/People';

function App() {


  return (
    <div className='App'>
     <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Planets/>}/>
        <Route path="/people" element={<People />} />
      </Routes>
    </Router>
   
    </div>

  );
}

export default App;

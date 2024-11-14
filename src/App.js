import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Homepage from './components/Homepage/Homepage';
import Artists from './components/Artists/Artists';
import Songs from './components/Songs/Songs';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div>
       
        <NavBar />

        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/songs" element={<Songs />} />
         
          <Route path="*" element={<Homepage />} />
        </Routes>

       
        <Footer />
      </div>
    </Router>
  );
}

export default App;

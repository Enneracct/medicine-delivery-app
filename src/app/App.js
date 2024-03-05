import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css'; 
import Pharmacies from './components/pharmacies.jsx';
import NavBar from './components/header.jsx';
import MedicineGrid from './components/medicineGrid.jsx';
import CartPage from './components/CartPage.jsx'; 
import { MedicineProvider  } from './MedicineContext.js';
import { BookmarkProvider } from './BookmarkContext';


function App() {
  return (
    <MedicineProvider >
      <BookmarkProvider>
        <Router>
          <div className="App">
            <Pharmacies/>
            <div className='w-full'>
              <NavBar/>     
              <Routes>
                <Route path="/" element={<MedicineGrid />} /> 
                <Route path="/cart" element={<CartPage />} /> 
              </Routes>
            </div>
          </div>
        </Router>
      </BookmarkProvider>
    </MedicineProvider >
  );
}

export default App;
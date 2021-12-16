
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AddProduct from '../pages/AddProduct';
import ProductTable from '../pages/ProductTable';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/add' element={<AddProduct />}/>
        <Route path='/table' element={<ProductTable />}/>
      </Routes>
    </React.Fragment>
    );
}

export default App;

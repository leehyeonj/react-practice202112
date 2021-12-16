import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import AddProduct from './pages/AddProduct.tsx';
import ProductTable from './pages/ProductTable.tsx';

const App = function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/table" element={<ProductTable />} />
    </Routes>
  );
};

export default App;


import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Table from '../components/Table';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Table/>}/>
      </Routes>
    </React.Fragment>
    );
}

export default App;

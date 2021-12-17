// App.jsx

import React from "react";
import Table from "../components/Table";
import { Route,Routes} from "react-router-dom";
import InfiniteQueriespage from "../components/InfiniteQueriespage";
import InfiniteTable from "../components/InfiniteTable";

function App() {

  return (
    <React.Fragment>
      {/* <Search/> */}
        <Routes>
          <Route path='/' element={<Table/>}/>
          <Route path='/infinite' element={<InfiniteQueriespage/>}/>
          <Route path='/infinite-table' element={<InfiniteTable/>}/>
        </Routes>
    </React.Fragment>
  );
}

export default App;
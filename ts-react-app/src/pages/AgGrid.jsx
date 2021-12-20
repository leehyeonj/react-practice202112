import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Box, Button, Stack } from "@mui/material";

const AgGrid = () => {
  const [btnselection, setBtnSelection] = useState(false);
  const columnDefs = [
    {
      headerName: "Make",
      field: "make",
      filter: true,
      sortable: true,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
  ];
  const rowData = [
    {
      make: "Toyota",
      model: "Celica",
      price: 35000,
    },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];

  const onSelectionChanged = (event) => {
    var rowCount = event.api.getSelectedNodes().length;
    if (rowCount > 0) {
      setBtnSelection(true);
    }
    if (rowCount === 0) {
      setBtnSelection(false);
    }
  };

  return (
    <>
      <h2>This is ag grid</h2>
      <pre>
        1. 전체 select 2. select 후 버튼 able 3. 일부 데이터 select false 4.
        컬럼 sticky
      </pre>
      <div>
        <Button variant="contained" disabled={!btnselection}>
          사입 요청하기
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
        >
          <AgGridColumn field="make"></AgGridColumn>
          <AgGridColumn field="model"></AgGridColumn>
          <AgGridColumn field="price"></AgGridColumn>
        </AgGridReact>
      </div>
    </>
  );
};

export default AgGrid;

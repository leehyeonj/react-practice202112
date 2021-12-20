import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const AgGrid = () => {
  const columnDefs = [
    {
      headerName: "Make",
      field: "make",
      filter: true,
      sortable: true,
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
  const autoGroupColumnDef = {
    headerName: "Model",
    filed: "model",
    // cellRenderer: "agGroupCellRenderer",
    cellRendererParams: {
      checkbox: true,
    },
  };
  const onButtonClick = () => {
    console.log("clicked");
  };
  return (
    <>
      <h2>This is ag grid</h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
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

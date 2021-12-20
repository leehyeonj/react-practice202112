import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Box, Button, Stack } from "@mui/material";

const AgGrid = () => {
  const [btnselection, setBtnSelection] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => params.api.setRowData(data);

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };
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

  //선택했을때 나오는 메소드
  const onSelectionChanged = (event) => {
    var rowCount = event.api.getSelectedNodes().length;
    if (rowCount > 0) {
      setBtnSelection(true);
    }
    if (rowCount === 0) {
      setBtnSelection(false);
    }
  };

  const selectAllAmerican = () => {
    gridApi.forEachNode(function (node) {
      node.setSelected(node.data.country === "United States");
    });
  };

  const selectData = (event) => {
    console.log(event);
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
        <Button variant="contained" onClick={selectAllAmerican}>
          get all price 72000
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            headerCheckboxSelection: true,
            checkboxSelection: true,
          }}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
          onGridReady={onGridReady}
        >
          <AgGridColumn field="athlete" minWidth={150} />
          <AgGridColumn field="age" maxWidth={90} />
          <AgGridColumn field="country" minWidth={150} />
          <AgGridColumn field="year" maxWidth={90} />
          <AgGridColumn field="date" minWidth={150} />
          <AgGridColumn field="sport" minWidth={150} />
          <AgGridColumn field="gold" />
          <AgGridColumn field="silver" />
          <AgGridColumn field="bronze" />
          <AgGridColumn field="total" />
        </AgGridReact>
      </div>
    </>
  );
};

export default AgGrid;

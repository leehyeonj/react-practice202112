import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./styles.css";

const AgGrid = () => {
  console.log("ag grid");
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

  return (
    <>
      <div>h2</div>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "600px",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <h1>hello</h1>
          <AgGridReact
            rowData={rowData}
            rowSelection={"multiple"}
            suppressRowClickSelection={true}
            defaultColDef={{
              editable: true,
              sortable: true,
              minWidth: 100,
              filter: true,
              resizable: true,
              floatingFilter: true,
              flex: 1,
            }}
            sideBar={{
              toolPanels: ["columns", "filters"],
              defaultToolPanel: "",
            }}
            onGridReady={onGridReady}
          >
            <AgGridColumn
              headerName=""
              headerCheckboxSelection={true}
              checkboxSelection={true}
              floatingFilter={false}
              suppressMenu={true}
              minWidth={50}
              maxWidth={50}
              width={50}
              flex={0}
              resizable={false}
              sortable={false}
              editable={false}
              filter={false}
              suppressColumnsToolPanel={true}
            />
            <AgGridColumn headerName="Participant">
              <AgGridColumn field="athlete" minWidth={170} />
              <AgGridColumn field="country" minWidth={150} />
            </AgGridColumn>
            <AgGridColumn field="sport" />
            <AgGridColumn headerName="Medals">
              <AgGridColumn
                field="total"
                columnGroupShow="closed"
                filter="agNumberColumnFilter"
                width={120}
                flex={0}
              />
              <AgGridColumn
                field="gold"
                columnGroupShow="open"
                filter="agNumberColumnFilter"
                width={100}
                flex={0}
              />
              <AgGridColumn
                field="silver"
                columnGroupShow="open"
                filter="agNumberColumnFilter"
                width={100}
                flex={0}
              />
              <AgGridColumn
                field="bronze"
                columnGroupShow="open"
                filter="agNumberColumnFilter"
                width={100}
                flex={0}
              />
            </AgGridColumn>
            <AgGridColumn field="year" filter="agNumberColumnFilter" />
          </AgGridReact>
        </div>
      </div>
    </>
  );
};

export default AgGrid;

import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const AgEnterprise = () => {
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
    <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
      <AgGridReact
        rowData={rowData}
        defaultColDef={{
          width: 150,
          editable: true,
          filter: "agTextColumnFilter",
          floatingFilter: true,
          resizable: true,
        }}
        defaultColGroupDef={{ marryChildren: true }}
        rowSelection="multiple"
        onGridReady={onGridReady}
        columnTypes={{
          numberColumn: {
            width: 130,
            filter: "agNumberColumnFilter",
          },
          medalColumn: {
            width: 100,
            columnGroupShow: "open",
            filter: false,
          },
          nonEditableColumn: { editable: false },
          dateColumn: {
            filter: "agDateColumnFilter",
            filterParams: {
              comparator: (filterLocalDateAtMidnight, cellValue) => {
                const dateParts = cellValue.split("/");
                const day = Number(dateParts[0]);
                const month = Number(dateParts[1]) - 1;
                const year = Number(dateParts[2]);
                const cellDate = new Date(year, month, day);
                if (cellDate < filterLocalDateAtMidnight) {
                  return -1;
                } else if (cellDate > filterLocalDateAtMidnight) {
                  return 1;
                } else {
                  return 0;
                }
              },
            },
          },
        }}
      >
        <AgGridColumn headerName="Athlete" field="athlete" />
        <AgGridColumn headerName="Sport" field="sport" />
        <AgGridColumn headerName="Age" field="age" type="numberColumn" />
        <AgGridColumn headerName="Year" field="year" type="numberColumn" />
        <AgGridColumn
          headerName="Date"
          field="date"
          type={["dateColumn", "nonEditableColumn"]}
          width={220}
        />
        <AgGridColumn headerName="Medals" groupId="medalsGroup">
          <AgGridColumn headerName="Gold" field="gold" type="medalColumn" />
          <AgGridColumn headerName="Silver" field="silver" type="medalColumn" />
          <AgGridColumn headerName="Bronze" field="bronze" type="medalColumn" />
          <AgGridColumn
            headerName="Total"
            field="total"
            type="medalColumn"
            columnGroupShow="closed"
          />
        </AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default AgEnterprise;

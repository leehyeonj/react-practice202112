import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./styles.css";
import Button from "@mui/material/Button";
import axios from "axios";

const Dealibird = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [btndisabled, setBtnDisabled] = useState(true);
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => params.api.setRowData(data);

    // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //   .then((resp) => resp.json())
    //   .then((data) => updateData(data));
    axios
      .get("http://localhost:3001/nosnos")
      .then((res) => updateData(res.data));
  };

  const onSelectionChanged = () => {
    const data = gridApi.getSelectedRows();

    if (data.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
    setSelectedRows(gridApi.getSelectedRows());
  };

  const onCellValueChanged = (e) => {
    console.log("changed", e.data);
    const id = e.data.id;
    axios.put(`http://localhost:3001/nosnos/${id}`, e.data);
  };
  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "600px",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <h1>editable table</h1>
          <div>
            <Button variant="contained" disabled={btndisabled}>
              엑셀받기
            </Button>
            <Button variant="contained" disabled={btndisabled}>
              바코드 인쇄
            </Button>
          </div>
          <AgGridReact
            rowData={rowData}
            rowSelection={"multiple"}
            suppressRowClickSelection={false}
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
            onSelectionChanged={onSelectionChanged}
            onCellEditingStopped={(e) => {
              onCellValueChanged(e);
            }}
          >
            <AgGridColumn
              headerName="..HELLO."
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
              pinned="left"
            />
            <AgGridColumn headerName="기본정보">
              <AgGridColumn
                field="sellerName"
                headerName="셀러명"
                minWidth={170}
                pinned="left"
              />
              <AgGridColumn
                field="SKU"
                headerName="SKU(상품코드)"
                minWidth={150}
              />

              <AgGridColumn
                field="buildingName"
                headerName="건물명"
                minWidth={150}
              />
              <AgGridColumn
                field="wholeSaleName"
                headerName="도매명"
                minWidth={150}
              />
              <AgGridColumn
                field="wholeSaleProduct"
                headerName="도매상품명"
                minWidth={150}
              />
              <AgGridColumn
                field="productName"
                headerName="판매상품명"
                minWidth={150}
              />
              <AgGridColumn field="price" headerName="단가" minWidth={150} />
            </AgGridColumn>
            <AgGridColumn headerName="재고 현황">
              <AgGridColumn
                field="wholeStock"
                columnGroupShow="closed"
                filter="agNumberColumnFilter"
                headerName="총재고"
                width={120}
                flex={0}
              />
              <AgGridColumn
                field="dealibirdStock"
                columnGroupShow="open"
                filter="agNumberColumnFilter"
                headerName="딜러버드재고"
                width={100}
                flex={0}
              />
              <AgGridColumn
                field="normalStock"
                columnGroupShow="open"
                filter="agNumberColumnFilter"
                headerName="정상"
                width={100}
                flex={0}
              />
              <AgGridColumn
                field="errorStock"
                columnGroupShow="open"
                filter="agNumberColumnFilter"
                headerName="불량"
                width={100}
                flex={0}
              />
              <AgGridColumn
                field="undecided"
                columnGroupShow="open"
                filter="agNumberColumnFilter"
                headerName="미확정"
                width={100}
                flex={0}
              />
              <AgGridColumn
                field="deliveryOrder"
                columnGroupShow="open"
                filter="agNumberColumnFilter"
                headerName="출고지시"
                width={100}
                flex={0}
              />
              <AgGridColumn
                field="deliveryProgress"
                columnGroupShow="open"
                filter="agNumberColumnFilter"
                headerName="출고작업중"
                width={100}
                flex={0}
              />
            </AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </>
  );
};

export default Dealibird;

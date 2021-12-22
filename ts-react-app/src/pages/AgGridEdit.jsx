import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { rowData } from "../data/agedit";

function getPinnedTopData() {
  return [
    {
      firstName: "##",
      lastName: "##",
      gender: "##",
      address: "##",
      mood: "##",
      country: "##",
    },
  ];
}
function getPinnedBottomData() {
  return [
    {
      firstName: "##",
      lastName: "##",
      gender: "##",
      address: "##",
      mood: "##",
      country: "##",
    },
  ];
}
function getCharCodeFromEvent(event) {
  event = event || window.event;
  return typeof event.which === "undefined" ? event.keyCode : event.which;
}
function isCharNumeric(charStr) {
  return !!/\d/.test(charStr);
}
function isKeyPressedNumeric(event) {
  var charCode = getCharCodeFromEvent(event);
  var charStr = String.fromCharCode(charCode);
  return isCharNumeric(charStr);
}

const AgGridEdit = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    console.log("ongridready");
    setGridApi(params.api);
    console.log(gridApi);
    setGridColumnApi(params.columnApi);
  };

  const onBtStopEditing = () => {
    gridApi.stopEditing();
  };

  const onBtStartEditing = (key, char, pinned) => {
    gridApi.setFocusedCell(0, "lastName", pinned);
    gridApi.startEditingCell({
      rowIndex: 0,
      colKey: "lastName",
      rowPinned: pinned,
      keyPress: key,
      charPress: char,
    });
  };

  const onBtNextCell = () => {
    gridApi.tabToNextCell();
  };

  const onBtPreviousCell = () => {
    gridApi.tabToPreviousCell();
  };

  const onBtWhich = () => {
    var cellDefs = gridApi.getEditingCells();
    if (cellDefs.length > 0) {
      var cellDef = cellDefs[0];
      console.log(
        "editing cell is: row = " +
          cellDef.rowIndex +
          ", col = " +
          cellDef.column.getId() +
          ", floating = " +
          cellDef.rowPinned
      );
    } else {
      console.log("no cells are editing");
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="example-wrapper">
        <div
          style={{
            marginBottom: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <button onClick={() => onBtStartEditing()}>edit (0)</button>
            <button onClick={() => onBtStartEditing(46)}>
              edit (0, Delete)
            </button>
            <button onClick={() => onBtStartEditing(null, "T")}>
              edit (0, 'T')
            </button>
            <button onClick={() => onBtStartEditing(null, null, "top")}>
              edit (0, Top)
            </button>
            <button onClick={() => onBtStartEditing(null, null, "bottom")}>
              edit (0, Bottom)
            </button>
          </div>
          <div>
            <button onClick={() => onBtStopEditing()}>stop ()</button>
            <button onClick={() => onBtNextCell()}>next ()</button>
            <button onClick={() => onBtPreviousCell()}>previous ()</button>
          </div>
          <div>
            <button onClick={() => onBtWhich()}>which ()</button>
          </div>
        </div>
        <div>
          <div
            id="myGrid"
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <AgGridReact
              rowData={rowData}
              defaultColDef={{
                flex: 1,
                minWidth: 110,
                editable: true,
                resizable: true,
              }}
              pinnedTopRowData={getPinnedTopData()}
              pinnedBottomRowData={getPinnedBottomData()}
              onGridReady={onGridReady}
            >
              <AgGridColumn field="firstName" />
              <AgGridColumn field="lastName" />
              <AgGridColumn field="gender" />
              <AgGridColumn field="age" />
              <AgGridColumn field="mood" />
              <AgGridColumn field="country" />
              <AgGridColumn field="address" minWidth={550} />
            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgGridEdit;

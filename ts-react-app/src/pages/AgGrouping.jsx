import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import "ag-grid-enterprise";

const GenderRenderer = (props) => {
  const image = props.value === "Male" ? "male.png" : "female.png";
  const imageSource = `https://www.ag-grid.com/example-assets/genders/${image}`;
  return (
    <span>
      <img src={imageSource} alt="" />
      {props.value}
    </span>
  );
};

const MoodRenderer = (props) => {
  return <div>mood</div>;
};
const AgGrouping = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <>
      <h2>This is ag grid grouping</h2>
      <pre>1. grouping 2. pivot 3. editing 4. rendering</pre>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={[
            {
              value: 14,
              type: "age",
            },
            {
              value: "female",
              type: "gender",
            },
            {
              value: "Happy",
              type: "mood",
            },
            {
              value: 21,
              type: "age",
            },
            {
              value: "male",
              type: "gender",
            },
            {
              value: "Sad",
              type: "mood",
            },
          ]}
          defaultColDef={{ flex: 1, editable: true, sortable: true }}
          frameworkComponents={{
            genderCellRenderer: GenderRenderer,
            moodCellRenderer: MoodRenderer,
          }}
          onGridReady={onGridReady}
          animateRows={true}
        >
          <AgGridColumn field="value" />
          <AgGridColumn
            headerName="Rendered Value"
            field="value"
            cellRendererSelector={(params) => {
              const moodDetails = { component: "moodCellRenderer" };
              const genderDetails = {
                component: "genderCellRenderer",
                params: {
                  values: ["Male", "Female"],
                },
              };
              if (params.data.type === "gender") return genderDetails;
              else if (params.data.type === "mood") return moodDetails;
              else return undefined;
            }}
          />
          <AgGridColumn field="type" />
        </AgGridReact>
      </div>
    </>
  );
};

export default AgGrouping;

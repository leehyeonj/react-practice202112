import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./styles.css";
import Button from "@mui/material/Button";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import Table from "../components/Table";

const Dealibird = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    console.log("params", params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => params.api.setRowData(data);

    axios
      .get("http://localhost:3001/nosnos")
      .then((res) => updateData(res.data));
  };

  return (
    <>
      <SearchForm />
      <Table onGridReady={onGridReady} rowData={rowData} gridApi={gridApi} />
    </>
  );
};

export default Dealibird;

import React, { useMemo, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { columns } from "../data/columns";
import { rows } from "../data/rows";

export default function Incomplete() {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => rows, [rows]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGridPro
          rows={rowData}
          columns={columnData}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          isRowSelectable={(params: any) => params.row.OrderAmount > 1}
          initialState={{
            pinnedColumns: { left: ["orderDate"], right: ["age"] },
          }}
          onSelectionModelChange={(newSelectionModel: any) => {
            setSelectionModel(newSelectionModel);
            setIsSelected(!isSelected);
            if (newSelectionModel.length > 0) {
              setIsSelected(true);
            }
          }}
        />
      </div>
      <h2>{isSelected ? "true" : "false"}</h2>
    </>
  );
}

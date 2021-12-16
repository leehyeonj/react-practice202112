import React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { columns } from "../data/columns";
import { rows } from "../data/rows";

export default function Incomplete() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        isRowSelectable={(params: any) => params.row.age > 40}
        initialState={{
          pinnedColumns: { left: ["orderDate"], right: ["age"] },
        }}
      />
    </div>
  );
}

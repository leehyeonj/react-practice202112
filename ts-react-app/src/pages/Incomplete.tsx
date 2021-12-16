import React, { useMemo } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { columns } from "../data/columns";
import { rows } from "../data/rows";

export default function Incomplete() {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => rows, [rows]);

  return (
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
      />
    </div>
  );
}

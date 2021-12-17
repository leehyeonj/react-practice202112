import React, { useEffect, useMemo, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import { data } from "../data/data";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { reactTableColumn } from "../data/reactTableColumn";
import { rows } from "../data/rows";
import { Box, Button, Stack } from "@mui/material";

const tableStyle = css`
  border-spacing: 0;
  border: 1px solid black;
  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
`;

const IndeterminateCheckbox = React.forwardRef(
  ({ row, indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    const [isTrue, setIsTrue] = useState(false);
    // const isDisabled = row.orginal.orderAmount > 1;

    useEffect(() => {
      if (row?.values?.orderAmount < 2) {
        setIsTrue(true);
      }
    }, [row]);
    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} disabled={isTrue} />
      </>
    );
  }
);

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    allColumns,
    getToggleHideAllColumnsProps,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                {...row.getToggleRowSelectedProps()}
                row={row}
              />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  console.log(selectedFlatRows);

  // Render the UI for your table
  return (
    <>
      <div>
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
      <table {...getTableProps()} css={tableStyle}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
    </>
  );
}
const Receiving = () => {
  return (
    <div>
      <h2>react table 사용</h2>
      <Stack spacing={1} direction="row">
        <Button variant="contained">사입요청하기</Button>
        <Button variant="contained">사입요청하기</Button>
        <Button variant="contained">사입요청하기</Button>
      </Stack>
      <Table columns={reactTableColumn} data={rows} />
    </div>
  );
};

export default Receiving;

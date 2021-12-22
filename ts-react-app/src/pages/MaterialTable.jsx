import React, { useState } from "react";
import MaterialTable from "material-table";
const MaterialTableEx = () => {
  const [columns, setColumns] = useState([
    { title: "Name", field: "name" },
    {
      title: "Surname",
      field: "surname",
      initialEditValue: "initial edit value",
    },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    {
      title: "Birth Place",
      field: "birthCity",
      lookup: { 34: "istanbul", 63: "korea" },
    },
  ]);

  const [data, setData] = useState([
    { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    { name: "Zerya", surname: "Baran", birthYear: 2017, birthCity: 34 },
  ]);

  return (
    <>
      <h2>material table 사용</h2>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          title="Cell Editable Preview"
          columns={columns}
          data={data}
          options={{
            selection: true,
            selectionProps: (rowData) => ({
              disabled: rowData.name === "Mehmet",
              color: "primary",
            }),
          }}
        />
      </div>
    </>
  );
};

export default MaterialTableEx;

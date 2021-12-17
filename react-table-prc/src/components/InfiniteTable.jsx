import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useBlockLayout } from "react-table";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddProduct, { ProductType } from "./AddProduct";
import Button from '@mui/material/Button';
import { useSticky } from 'react-table-sticky';
import { columns } from "./column";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery
} from 'react-query';


const tableStyle = css`
width: 100%;
border: 1px solid #e3e3e3;
border-collapse: collapse;
`;
const thStyle = css`
padding: 10px;
border: 1px solid #e3e3e3;
font-size : 0.8rem;
background: white;
`;
const tdStyle = css`
text-align: center;
padding: 10px;
border: 1px solid #e3e3e3;
height: auto;
background: inherit;
`;
const trStyle = css`
tr:nth-child(odd) {
  background: #f3f3f3;
}
tr:nth-child(even){
  background: white;
}
`;
const inputStyle = css`
border: 0;
width :-webkit-fill-available;
background: inherit;
`;

const imgStyle = css`
width: 100px;
`;



const fetchData = ({pageParam = 1}) => {
  return axios.get(`http://localhost:3000/stores?_limit=2&_page=${pageParam}`);
}

//table query
const TableQuery = ()=>{
  const [tableData, setTableData] = useState();
  const {
    isLoading, 
    isError, 
    error, 
    data : apiResponse , 
    hasNextPage, 
    fetchNextPage, 
    isFetching, 
    isFetchingNextPage
  }  = useInfiniteQuery(
    'nosnosStore',
    fetchData,
    {
        getNextPageParam : (_lastPage, pages) => {
            if(pages.length < 4) {
                return pages.length + 1
            } else{
                return undefined
            }
        }
    }
)

useEffect(() => {
  setTableData(apiResponse?.pages[0]?.data);
},[apiResponse])


const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow
} = useTable({
  columns,
  tableData
})

  if (isLoading || !tableData) {
    return <div>Loading...</div>
  }

  return(
     <div>
        <table {...getTableProps()} css={tableStyle}>
          <thead >
            {headerGroups?.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers?.map(column => (
                  <th {...column.getHeaderProps()} css={thStyle}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} css={trStyle}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()} css={tdStyle}>{cell.render('Cell')}</td>
                  })}
                </tr>
              
              )
            })}
          </tbody>
        </table>
    <div>
      <button onClick={fetchNextPage}>load more</button>
    </div>
    </div>
  )
}


//table
const client = new QueryClient();

const divStyle = css`
margin: 20px;
padding: 20px;
border-radius : 10px;
box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
box-sizing: border-box;
`;

const tableWrapperStyle = css`
overflow: scroll;
`;
const InfiniteTable = ()=> {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true)
  }
  
  const buyRequest = () => {
    window.confirm('사입을 요청하시겠습니까?')
  }


  return (
    <>
    <QueryClientProvider client={client}>
      <TableQuery/>
    </QueryClientProvider>
    </>
  );
}

const tableTitleStyle = css`
display: flex;
justify-content: space-between;
font-size: 14px;
`;

export default InfiniteTable;
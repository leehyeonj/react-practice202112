import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useBlockLayout } from "react-table";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddProduct, { ProductType } from "./AddProduct";
import Button from '@mui/material/Button';
import { useSticky } from 'react-table-sticky';

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
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

const EditableCell= ({
  value : initialValue,
  row : {index},
  column : {id},
  updateMyData,
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [type, setType] = useState<string>('type');
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
  }
  const onBlur = () => {
    updateMyData(id, index, value)
  }

  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && inputRef.current) {
      inputRef.current.blur();
    }
  }
  useEffect(()=>{
      setValue(initialValue)
      setType(typeof value)
  },[initialValue])

  return <input 
            value={value} 
            onChange={onChange} 
            onBlur={onBlur} 
            css={inputStyle}
            onKeyPress={handleKeyPress}
            ref={inputRef}
            type={type}
            />
}

const defaultColumn = {
  Cell : EditableCell,
}



const fetchData = () => axios.get('http://localhost:3000/stores');
//table query
const TableQuery = ()=>{
  const [tableData, setTableData] = useState<ProductType>();
  const {data: apiResponse, isLoading} = useQuery('nosnosStore', fetchData);

  useEffect(() => {
    setTableData(apiResponse?.data);
  },[apiResponse])

  if (isLoading || !tableData) {
    return <div>Loading...</div>
  }

  const updateMyData = (id:string, index:number , value:string) => {
    const serverId = index+1;
     axios.patch(`http://localhost:3000/stores/${serverId}`,{
      wholesaleProductOption : value
    })
  }
  return(
    <TableInstance tableData={tableData} updateMyData={updateMyData}/>
  )
}


//table instance
const TableInstance = ({tableData , updateMyData}) => { 
  const [columns, data] = useMemo(
    () => {
      const columns = [
            {
              accessor: "delete",
              Header: "??????",
              sticky : 'left',
              Cell: () =>
              <>
                <DeleteForeverOutlinedIcon />
              </>
              
            },
            {
              accessor: "reorder",
              Header: "?????????",
              sticky : 'left',
              Cell: () => <p style={{width:'100px', fontSize:'14px'}}>????????????</p>
            },
            {
              accessor: "available",
              Header: "?????? ??????",
              sticky : 'left',
              Cell: (props) =><p style={{width:'100px', fontSize:'14px'}}>{props.cell.value}</p>
            },
            {
              accessor: "ifSoldout",
              Header: "?????? ?????????",
              sticky : 'left',
              Cell : (props) => 
              <select style={{width:'100px', fontSize:'14px'}} defaultValue={props.cell.value}>
                <option value="misong">??????</option>
                <option value="refund">??????</option>
              </select>
            },
            {
              accessor: "image",
              Header: "?????????",
              sticky : 'left',
              Cell : (props) => {
                return(<img css={imgStyle} src={props.cell.value} alt=''/>)
              }
           
            },
            {
              accessor: "wholesaleProduct",
              Header: "?????? ?????????",
              sticky : 'left',
            },
            {
              accessor: "wholesaleProductOption",
              Header: "?????? ???????????? 1",
              sticky : 'left',
            },
            {
              accessor: "wholesaleProductOption2",
              Header: "?????? ???????????? 2",
            },
            {
              accessor: "saleProduct",
              Header: "?????? ?????????",
            },
            {
              accessor: "saleProductOption",
              Header: "?????? ????????????",
            }, 
            {
              accessor: "wholesalePrice",
              Header: "?????? ??????",
            },
            {
              accessor: "buyAmount",
              Header: "?????? ??????",
            },
            {
              accessor: "wholesaleStoreName",
              Header: "?????? ?????????",
            },
            {
              accessor: "wholesaleStoreBuilding",
              Header: "?????? ?????? (?????????)",
            },
            {
              accessor: "wholesaleStoreLocation",
              Header: "?????? ?????? (???/?????????)",
            },
            {
              accessor: "wholesaleContact",
              Header: "?????? ????????? 1",
            },
            {
              accessor: "wholesaleContact2",
              Header: "?????? ????????? 2",
            },
            {
              accessor: "productDetailURL",
              Header: "?????? ?????? URL",
            },
            {
              accessor: "productCategory",
              Header: "?????? ????????????",
            },
            {
              accessor: "requestWhenBuy",
              Header: "????????? ????????????",
            },
            {
              accessor: "requestWhenInspection",
              Header: "?????? ????????? ?????? ??????1",
            },
            {
              accessor: "requestWhenInspection2",
              Header: "?????? ????????? ?????? ??????2",
            },
            {
              accessor: "customerProductCode",
              Header: "????????? ?????? ??????",
            },
            {
              accessor: "memo1",
              Header: "?????? ?????? 1",
            },
            {
              accessor: "memo2",
              Header: "?????? ?????? 2",
            },
      ];
      return [columns , tableData];
    },
    [tableData]
  );

  const tableInstance = useTable({
    columns, 
    data, 
    defaultColumn, 
    updateMyData
  },
  useBlockLayout,  
  useSticky);
  
  return(
    <TableLayout {...tableInstance}/>
  )
}

//table layout
const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
}) => {
  console.log('getTableProps', getTableProps)
  return (
    <table {...getTableProps()} css={tableStyle}>
      <thead >
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
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
  );
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
const Table = ()=> {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true)
  }
  
  const buyRequest = () => {
    window.confirm('????????? ?????????????????????????')
  }


  return (
    <>
    <QueryClientProvider client={client}>
      <div css={divStyle}>
        <div css={tableTitleStyle}>
          <p>?????? ?????? 0??? | ?????? ?????? 2??? | ?????? ????????? 0??? </p>
          <div>
            <Button variant="outlined"   
              onClick={openModal}>?????? ?????? ??????</Button>
            <Button variant="contained" disableElevation 
               onClick={buyRequest}>?????? ????????????</Button>
          </div>
        </div>
        <div css={tableWrapperStyle}>
          <TableQuery />
        </div>
        
      </div>
      {
        isModalOpen && <AddProduct isModalOpen={isModalOpen} setModalOpen ={setModalOpen}/>
      }
     
    </QueryClientProvider>
    </>
  );
}

const tableTitleStyle = css`
display: flex;
justify-content: space-between;
font-size: 14px;
`;

export default Table;
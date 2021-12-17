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
              Header: "삭제",
              sticky : 'left',
              Cell: () =>
              <>
                <DeleteForeverOutlinedIcon />
              </>
              
            },
            {
              accessor: "reorder",
              Header: "재주문",
              sticky : 'left',
              Cell: () => <p style={{width:'100px', fontSize:'14px'}}>신규주문</p>
            },
            {
              accessor: "available",
              Header: "요청 가능",
              sticky : 'left',
              Cell: (props) =><p style={{width:'100px', fontSize:'14px'}}>{props.cell.value}</p>
            },
            {
              accessor: "ifSoldout",
              Header: "일시 품절시",
              sticky : 'left',
              Cell : (props) => 
              <select style={{width:'100px', fontSize:'14px'}} defaultValue={props.cell.value}>
                <option value="misong">미송</option>
                <option value="refund">환불</option>
              </select>
            },
            {
              accessor: "image",
              Header: "이미지",
              sticky : 'left',
              Cell : (props) => {
                return(<img css={imgStyle} src={props.cell.value} alt=''/>)
              }
           
            },
            {
              accessor: "wholesaleProduct",
              Header: "도매 상품명",
              sticky : 'left',
            },
            {
              accessor: "wholesaleProductOption",
              Header: "도매 상품옵션 1",
              sticky : 'left',
            },
            {
              accessor: "wholesaleProductOption2",
              Header: "도매 상품옵션 2",
            },
            {
              accessor: "saleProduct",
              Header: "판매 상품명",
            },
            {
              accessor: "saleProductOption",
              Header: "판매 상품옵션",
            }, 
            {
              accessor: "wholesalePrice",
              Header: "도매 단가",
            },
            {
              accessor: "buyAmount",
              Header: "사입 수량",
            },
            {
              accessor: "wholesaleStoreName",
              Header: "도매 매장명",
            },
            {
              accessor: "wholesaleStoreBuilding",
              Header: "도매 매장 (건물명)",
            },
            {
              accessor: "wholesaleStoreLocation",
              Header: "도매 매장 (층/열호수)",
            },
            {
              accessor: "wholesaleContact",
              Header: "도매 연락처 1",
            },
            {
              accessor: "wholesaleContact2",
              Header: "도매 연락처 2",
            },
            {
              accessor: "productDetailURL",
              Header: "상품 상세 URL",
            },
            {
              accessor: "productCategory",
              Header: "상품 카테고리",
            },
            {
              accessor: "requestWhenBuy",
              Header: "사입시 요청사항",
            },
            {
              accessor: "requestWhenInspection",
              Header: "상품 검수시 요청 사항1",
            },
            {
              accessor: "requestWhenInspection2",
              Header: "상품 검수시 요청 사항2",
            },
            {
              accessor: "customerProductCode",
              Header: "고객사 상품 코드",
            },
            {
              accessor: "memo1",
              Header: "기타 메모 1",
            },
            {
              accessor: "memo2",
              Header: "기타 메모 2",
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
    window.confirm('사입을 요청하시겠습니까?')
  }


  return (
    <>
    <QueryClientProvider client={client}>
      <div css={divStyle}>
        <div css={tableTitleStyle}>
          <p>사입 요청 0건 | 요청 가능 2건 | 요청 불가능 0건 </p>
          <div>
            <Button variant="outlined"   
              onClick={openModal}>상품 직접 입력</Button>
            <Button variant="contained" disableElevation 
               onClick={buyRequest}>사입 요청하기</Button>
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
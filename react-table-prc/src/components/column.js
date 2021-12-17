import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


const imgStyle = css`
width: 100px;
`;

export const columns = [
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
//it is for react-table
const example = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
    ],
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
  },
];

export const reactTableColumn = [
  {
    Header: "오더등록일",
    accessor: "orderDate",
  },
  {
    Header: "입고오더상품코드",
    accessor: "orderProductCode",
  },
  {
    Header: "오더타입",
    accessor: "orderType",
  },
  {
    Header: "셀러명",
    accessor: "sellerName",
  },
  {
    Header: "SKU(상품코드)",
    accessor: "SKU",
  },
  {
    Header: "건물명",
    accessor: "buildingName",
  },
  {
    Header: "도매명",
    accessor: "wholeSaleName",
  },
  {
    Header: "도매상품명",
    accessor: "wholeSaleProductName",
  },
  {
    Header: "판매상품명",
    accessor: "saleProductName",
  },
  {
    Header: "판매상품옵션",
    accessor: "saleProductOption",
  },
  {
    Header: "도매단가",
    accessor: "wholeSaleCost",
  },
  {
    Header: "오더 수",
    accessor: "orderAmount",
  },
  {
    Header: "입고 수",
    accessor: "receivingAmount",
  },
  {
    Header: "교환 수",
    accessor: "changeAmount",
  },
  {
    Header: "상품입고",
    accessor: "productReceiving",
  },
  {
    Header: "진행상태",
    accessor: "process",
  },
  {
    Header: "검품 시 요청사항",
    accessor: "requestWhenInspection",
  },
  {
    Header: "셀러메모",
    accessor: "sellerMemo",
  },
  {
    Header: "최종처리자",
    accessor: "finalProcessor",
  },
  {
    Header: "최종처리시간",
    accessor: "finerProcessTime",
  },
];

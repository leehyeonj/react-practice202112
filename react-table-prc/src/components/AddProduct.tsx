import { useForm } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useCallback , Dispatch, SetStateAction} from "react";
import "./styles.css";
import axios from "axios";
import { useMutation, useQueryClient, QueryClientProvider } from "react-query";

const wrapperStyle = css`
background: black;
position: absolute;
top: 0;
width: 100vw;
height: 100vh;
opacity : 0.4;
`;
const formWrapperStyle = css`
width: 550px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
height: 90vh;
z-index: 100;
border-radius: 10px;
background : white;
overflow: hidden;
`;
const formHeadStyle = css`
padding: 20px;
background: #f8fafb;
display: flex;
justify-content: space-between;
font-size: 1.2rem;
border-bottom: 1px solid #eee;
p{
    padding: 0;
    margin: 0;
}
`;
const formStyle = css`
overflow-y: scroll;
padding: 20px;
height: inherit;
padding-bottom: 100px;
box-sizing: border-box;
div{
    display: flex;
    padding: 5px;

    label {
        width: 250px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #1d2e74;
    }

    input, textarea{
        padding: 6px 12px;
        background: #f8f9fa;
        border: 1px solid #ced4da;
        color: #0d1432;
        border-radius: 0.25rem;
        font-size: 13px;
    }
}
`;
const formErrorStyle = css`
display: flex;
flex-direction: column;
width: 100%;
select {
    border : 1px solid #ced4da;
    border-radius : 5px;
    padding: 6px;
}
p{
    color: #bf1650;
    font-size: 11px;
    padding: 5px 0px;
    margin: 0px;
}
`;
const formBottomStyle = css`
padding: 20px 10px;
border-top: 1px solid #eee;
display: flex;
justify-content: end;
width: 100%;
position: absolute;
bottom: 0;
background: white;
box-sizing: border-box;
`;

const primaryBtn = css`
padding: 8px 18px;
background: transparent;
border: none;
border-radius: 3px;
margin: 0px 5px;
font-size: 13px;
cursor: pointer;
`;
const secondaryBtn = css`
padding: 8px 18px;
background: #00107e;
border: none;
border-radius: 3px;
margin: 0px 5px;
color: white;
font-size: 13px;
&:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.1), 0 6px 15px 0 rgba(0,0,0,0.19);
   }
`;

export interface IProps {
    isModalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
  }
export type ProductType = {
    reorder: string;
    available : string;
    ifSoldout : string;
    image : string;
    wholesaleProduct : string;
    wholesaleProductOption : string;
    wholesaleProductOption2 : string;
    saleProduct : string;
    saleProductOption : string;
    wholesalePrice : number;
    buyAmount : number;
    wholesaleStoreName : string;
    wholesaleStoreBuilding : string;
    wholesaleStoreLocation : string;
    wholesaleContact : string;
    wholesaleContact2 : string;
    productDetailURL : string;
    productCategory : string;
    requestWhenBuy : string;
    requestWhenInspection : string;
    requestWhenInspection2 : string;
    customerProductCode : string;
    memo1 : string;
    memo2 : string;
    id : number;
}
const AddProduct = (props: IProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
      
    const queryClient = useQueryClient()

    const mutation = useMutation(
        (newProduct : object) => axios.post('http://localhost:3000/stores', {
            ...newProduct,
            available : 'x',

        }),
        {
            onSuccess : (newProduct) => {
                props.setModalOpen(false)
                queryClient.invalidateQueries('nosnosStore')
            }
        }
    )

    const onSubmit = useCallback(
        async (data:ProductType) => {
           await mutation.mutateAsync(data)
        },
        [mutation]
    ) 

    const closeModal = () => {
        props.setModalOpen(false)
    }
    return(
        <>
        <QueryClientProvider client={queryClient}>
            <form onSubmit={handleSubmit(onSubmit)} css={formWrapperStyle}>
                <div css={formHeadStyle}>
                    <p>상품 직접 입력</p>
                    <p onClick={closeModal}>X</p>
                </div>
                <div css={formStyle}>
                    <div>
                        <label>일시 품절시</label>
                        <div css={formErrorStyle}>
                            <select {...register("ifSoldout")} value='refund'>
                                <option value="refund" >환불</option>
                                <option value="misong">미송</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>도매 상품명</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("wholesaleProduct",  {required : true})} 
                                placeholder='도매 상품명을 입력해주세요.' />
                            {errors.wholesaleProduct && <p>필수 입력값입니다.</p>}
                        </div>
                        
                    </div>
                    <div>
                        <label>판매 상품명</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("saleProduct", {required : true})} 
                                placeholder='판매 상품명을 입력해주세요.' />
                            {errors.saleProduct && <p>필수 입력값입니다.</p>}
                        </div>
                    </div>
                    <div>
                        <label>상품옵션 1</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("wholesaleProductOption", {required : true})} 
                                placeholder='옵션을 입력해주세요.' />
                            {errors.wholesaleProductOption && <p>필수 입력값입니다.</p>}
                        </div>
                    </div>
                    <div>
                        <label>상품옵션 2</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("wholesaleProductOption2")} 
                                placeholder='옵션을 입력해주세요.' />
                        </div>
                    </div>
                    <div>
                        <label>판매상품옵션</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("saleProductOption")} 
                                placeholder='판매 상품옵션을 입력해주세요.' />
                        </div>
                    </div>
                    <div>
                        <label>도매 단가</label>
                        <div css={formErrorStyle}>
                            <input
                                type='number' 
                                {...register("wholesalePrice", {required : true})} 
                                placeholder='도매 단가를 입력해주세요.' />
                            {errors.wholesalePrice && <p>필수 입력값입니다.(100원 이상)</p>}
                        </div>
                    </div>
                    <div>
                        <label>사입 수량</label>
                        <div css={formErrorStyle}>
                            <input
                                type='number' 
                                {...register("buyAmount", {required : true})} 
                                placeholder='1개부터 요청 가능합니다.' />
                            {errors.buyAmount && <p>필수 입력값입니다.</p>}
                        </div>
                    </div>
                    <div>
                        <label>이미지</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("image")} 
                                />
                        </div>
                    </div>
                    <div>
                        <label>도매 매장명</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("wholesaleStoreName", {required : true})} 
                                placeholder='도매 매장명을 입력해주세요.' />
                            {errors.wholesaleStoreName && <p>필수 입력값입니다.</p>}
                        </div>
                    </div>
                    <div>
                        <label>도매 주소(건물명)</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("wholesaleStoreBuilding", {required : true})} 
                                placeholder='매장 건물명을 입력해주세요.' />
                            {errors.wholesaleStoreBuilding && <p>필수 입력값입니다.</p>}
                        </div>
                    </div>
                    <div>
                        <label>도매 주소(층/열/호수)</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("wholesaleStoreLocation", {required : true})} 
                                placeholder='도매 매장 상세주소를 입력해주세요.' />
                            {errors.wholesaleStoreLocation && <p>필수 입력값입니다.</p>}
                        </div>
                    </div>
                    <div>
                        <label>도매 연락처1</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("wholesaleContact", {required : true})} 
                                placeholder='도매 연락처를 입력해주세요.' />
                            {errors.wholesaleContact && <p>필수 입력값입니다.</p>}
                        </div>
                    </div>
                    <div>
                        <label>도매 연락처2</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("wholesaleContact2")} 
                                placeholder='도매 연락처를 입력해주세요.' />
                        </div>
                    </div>
                    <div>
                        <label>상품 상세 URL</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("productDetailURL")} 
                                placeholder='http://www.example.com' />
                        </div>
                    </div>
                    <div>
                        <label>상품 카테고리</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("productCategory")} 
                                placeholder='상품 카테고리 구분을 입력해주세요.' />
                        </div>
                    </div>
                    <div>
                        <label>사입시 전달사항</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("requestWhenBuy")} 
                                placeholder='사입 시 전달해야 할 사항을 입력해주세요.' />
                        </div>
                    </div>
                    <div>
                        <label>상품 검수시 요청 사항1</label>
                        <div css={formErrorStyle}>
                            <textarea 
                                {...register("requestWhenInspection")} 
                                placeholder='검수 및 검품 진행시 별도 요청하고자 하는 내용을 입력해주세요.' />
                            <p style={{color : '#1d2e74'}}>
                                딜리버드와 사전 논의되지 않은 요청일 경우 요청 사항에 대한 반영이 어려울 수 있습니다..</p>
                        </div>
                    </div>
                    <div>
                        <label>상품 검수시 요청 사항2</label>
                        <div css={formErrorStyle}>
                            <textarea 
                                {...register("requestWhenInspection2")} 
                                placeholder='검수 및 검품 진행시 별도 요청하고자 하는 내용을 입력해주세요.' />
                            <p style={{color : '#1d2e74'}}>
                                딜리버드와 사전 논의되지 않은 요청일 경우 요청 사항에 대한 반영이 어려울 수 있습니다..</p>
                        </div>
                    </div>
                    <div>
                        <label>고객사 상품 코드</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("customerProductCode")} 
                                placeholder='고객사 상품 코드를 입력해주세요.' />
                        </div>
                    </div>
                    <div>
                        <label>기타 메모1</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("memo1")} 
                                placeholder='메모사항을 자유롭게 입력하세요.' />
                        </div>
                    </div>
                    <div>
                        <label>기타 메모2</label>
                        <div css={formErrorStyle}>
                            <input 
                                {...register("memo2")} 
                                placeholder='메모사항을 자유롭게 입력하세요.' />
                        </div>
                    </div>
                </div>
              
                <div css={formBottomStyle}>
                    <button type="submit" css={secondaryBtn}>등록</button>
                    <div onClick={closeModal} css={primaryBtn}>취소</div>
                </div>
                
            </form>   
            <div css={wrapperStyle} onClick={closeModal}>
            </div>
            </QueryClientProvider>
        </>
    )
}


export default AddProduct;
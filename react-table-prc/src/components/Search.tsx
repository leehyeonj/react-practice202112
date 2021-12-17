import { useForm } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from "react";

const divStyle = css`
background: pink;
margin: 50px;
display: flex;
`;
const selectStyle = css`
padding: 10px 100px;
margin-right : 20px;
`;
const inputStyle = css`
padding: 10px;
width: 100%;
margin-right : 20px;
`;
const Search = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div css={divStyle}>
                    <select {...register("searchType")} css={selectStyle}>
                        <option value="sellerId">셀러ID</option>
                        <option value="seller">셀러명</option>
                        <option value="SKU">상품코드</option>
                        <option value="building">건물명</option>
                        <option value="wholesaleName">도매명</option>
                        <option value="wholesaleAddress">도매주소</option>
                        <option value="phoneNumber">연락처</option>
                        <option value="wholesaleProduct">판매제품</option>
                    </select>
                    <div>
                        <input {...register("searchKeyword")} css={inputStyle} />
                        <div>
                            <ul>
                                <li>이름</li>
                            </ul>
                        </div>
                    </div>
                    <button type="submit">찾기</button>
                </div>
            </form>
        </>
    )
}

export default Search;
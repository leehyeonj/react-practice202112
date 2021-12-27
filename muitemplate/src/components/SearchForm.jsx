import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";

const SearchForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "10px" }}>
            <Controller
              render={({ field }) => (
                <TextField
                  label="셀러명"
                  color="secondary"
                  focused
                  {...field}
                />
              )}
              name="sellerName"
              control={control}
              defaultValue=""
              className="materialUIInput"
            />
          </div>
          <div style={{ margin: "10px" }}>
            <Controller
              render={({ field }) => (
                <TextField
                  label="상품코드"
                  color="secondary"
                  focused
                  {...field}
                />
              )}
              name="SKU"
              control={control}
              defaultValue=""
            />
          </div>
          <div style={{ margin: "10px" }}>
            <Controller
              render={({ field }) => (
                <TextField
                  label="건물명"
                  color="secondary"
                  focused
                  {...field}
                />
              )}
              name="buildingName"
              control={control}
              defaultValue=""
            />
          </div>

          <div style={{ margin: "10px" }}>
            <Controller
              render={({ field }) => (
                <TextField
                  label="도매명"
                  color="secondary"
                  focused
                  {...field}
                />
              )}
              name="wholeSaleName"
              control={control}
              defaultValue=""
            />
          </div>
          <div style={{ margin: "10px" }}>
            <Controller
              render={({ field }) => (
                <TextField
                  label="도매 상품명"
                  color="secondary"
                  focused
                  {...field}
                />
              )}
              name="wholeSaleProduct"
              control={control}
              defaultValue=""
            />
          </div>
          <div style={{ margin: "10px" }}>
            <Controller
              render={({ field }) => (
                <TextField
                  label="판매 상품명"
                  color="secondary"
                  focused
                  {...field}
                />
              )}
              name="productName"
              control={control}
              defaultValue=""
            />
          </div>
        </div>
        <Button variant="contained" type="submit">
          검색하기
        </Button>
      </form>
    </>
  );
};

export default SearchForm;

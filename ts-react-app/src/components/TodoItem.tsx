import { Button } from "@mui/material";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ITodoTypes, todoState } from "../recoil/todo";

interface PropTypes {
  id: number;
  content: string;
  isCompleted: boolean;
}
const TodoItem = (props: PropTypes) => {
  const { id, content, isCompleted } = props;
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todoState);

  const handleComplete = useCallback(
    (id: number) => {
      setTodos(
        todos.map((todo: ITodoTypes) => {
          return todo.id === id
            ? {
                ...todo,
                isCompleted: !todo.isCompleted,
              }
            : todo;
        })
      );
    },
    [setTodos, todos]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      setTodos(todos.filter((todo: ITodoTypes) => todo.id !== id));
    },
    [setTodos, todos]
  );
  return (
    <div style={{ display: "flex" }}>
      <h2
        onClick={() => {
          handleComplete(id);
        }}
      >
        {id}. {content} {isCompleted ? "o" : "x"}
      </h2>
      <Button variant="contained" onClick={() => deleteTodo(id)}>
        삭제
      </Button>
    </div>
  );
};

export default TodoItem;

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
  return (
    <div
      onClick={() => {
        handleComplete(id);
      }}
    >
      <h2>
        {id}. {content} {isCompleted ? "o" : "x"}
      </h2>
    </div>
  );
};

export default TodoItem;

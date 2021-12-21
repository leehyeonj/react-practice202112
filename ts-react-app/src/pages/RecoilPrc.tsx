import React, {
  ChangeEvent,
  KeyboardEventHandler,
  useCallback,
  useState,
} from "react";
import {
  useRecoilState,
  selector,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
import TodoItem from "../components/TodoItem";
import { numberLabelState, numberState } from "../state/state";
import { Input, Button } from "@mui/material";
import { inputState, ITodoTypes, todoState } from "../recoil/todo";

const RecoilPrc = (): JSX.Element => {
  const [content, setContent] = useRecoilState<string>(inputState);

  const todos = useRecoilValue<ITodoTypes[]>(todoState);
  const setTodo = useSetRecoilState<ITodoTypes[]>(todoState);

  //todo 추가하기
  const addTodo = useCallback((): void => {
    if (!content.trim()) {
      // 빈칸 입력 방지
      return;
    }
    const nextId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
    const todo: ITodoTypes = {
      id: nextId,
      contents: content,
      isCompleted: false,
    };

    setTodo([...todos, todo]);
    setContent("");
  }, [content, setContent, setTodo, todos]);
  //todo input text
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setContent(e.target.value);
    },
    [setContent]
  );
  //todo add keybord event
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        addTodo();
      }
    },
    [addTodo]
  );

  return (
    <div>
      <h2>This is recoil</h2>
      <div>
        <Input
          type="text"
          placeholder="todo입력"
          value={content}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <Button variant="contained" onClick={addTodo}>
          등록하기
        </Button>
      </div>
      {todos.map((todo: ITodoTypes) => {
        const { id, contents, isCompleted } = todo;
        return (
          <TodoItem
            key={id}
            id={id}
            content={contents}
            isCompleted={isCompleted}
          />
        );
      })}
    </div>
  );
};

export default RecoilPrc;

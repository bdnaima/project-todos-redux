import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "../../reducers/tasks";
import styled from "styled-components";

const StyledCheckbox = styled.input``;

const Todos = () => {
  const todoList = useSelector((state) => state.tasks.todos);
  const totalTasks = useSelector((state) => state.tasks.totalTasks);
  const uncompletedTasks = useSelector((state) => state.tasks.uncompletedTasks);

  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };
  return (
    <div>
      <h1>Todos</h1>
      <p>{totalTasks} tasks</p>
      <p>{uncompletedTasks} uncompleted tasks</p>

      {todoList.map((todo) => (
        <div key={todo.id}>
          <ul>
            <li>
              <StyledCheckbox
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleToggle(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.complete ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Todos;

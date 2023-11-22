// Todos.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "../../reducers/tasks";

import RemoveTask from "../RemoveTask/RemoveTask";
import EmptyState from "../EmptyState/EmptyState";
import CompleteAll from "../CompleteAll/CompleteAll";

const Todos = () => {
  const todoList = useSelector((state) => state.tasks.todos);

  const incompleteTasks = todoList.filter((task) => !task.complete);

  const dispatch = useDispatch();

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo({ id }));
  };

  return (
    <div>
      <h1>Todos</h1>
      <CompleteAll />
      <p>{incompleteTasks.length} tasks</p>

      {incompleteTasks.length === 0 ? (
        <>
          <EmptyState />
        </>
      ) : (
        <>
          {incompleteTasks.map((list) => (
            <section key={list.id}>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    checked={list.checked}
                    onChange={() => handleToggleTodo(list.id)}
                  />
                  <span
                    style={{
                      textDecoration: list.checked ? "line-through" : "none",
                    }}
                  >
                    {list.text}
                  </span>
                </li>
              </ul>
              <RemoveTask id={list.id} />
            </section>
          ))}
        </>
      )}
    </div>
  );
};

export default Todos;

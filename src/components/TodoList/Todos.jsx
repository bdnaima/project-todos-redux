
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

  const totalTasks = useSelector((state) => state.tasks.totalTasks);
  const uncompletedTasks = useSelector((state) => state.tasks.uncompletedTasks);
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
    console.log("check please")
  };


  return (
    <div>
      <h1>Todos</h1>
      <CompleteAll />
      <p>{totalTasks} tasks</p>
      <p>{uncompletedTasks} uncompleted tasks</p>
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
                    checked={list.complete}
                    onChange={() => handleToggle(list.id)}
                  />
                  <span
                    style={{
                      textDecoration: list.complete ? "line-through" : "none",
                    }}
                  >
                    {list.text}
                  </span>
                  {/* Display timestamp */}
                  {list.createdAt && (
                    <p className="timestamp">
                      Added at: {list.createdAt}
                    </p>
                  )}
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

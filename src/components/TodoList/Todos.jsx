// Todos.js
import React from "react";
import { useSelector } from "react-redux";
import RemoveTask from "../RemoveTask/RemoveTask";
import EmptyState from "../EmptyState/EmptyState";
import CompleteAll from "../CompleteAll/CompleteAll";

const Todos = () => {
  const todoList = useSelector((state) => state.tasks.todos);
  const incompleteTasks = todoList.filter((task) => !task.complete);

  return (
    <div>
      <h1>Todos</h1>
      <CompleteAll />
      {incompleteTasks.length === 0 ? (
        <>
         <EmptyState />
        </>
      ) : (
        <>
          {incompleteTasks.map((list) => (
            <section key={list.id}>
              <ul>
                <li>{list.text}</li>
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

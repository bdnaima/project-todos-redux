// Todos.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "../../reducers/tasks";
import RemoveTask from "../RemoveTask/RemoveTask";
import EmptyState from "../EmptyState/EmptyState";
import CompleteAll from "../CompleteAll/CompleteAll";
import AddTodo from "../AddTodos";


const Todos = () => {
  const todoList = useSelector((state) => state.tasks.todos);

  const incompleteTasks = todoList.filter((task) => !task.complete);

  const totalTasks = useSelector((state) => state.tasks.totalTasks);
  const uncompletedTasks = useSelector((state) => state.tasks.uncompletedTasks);
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
    console.log("check please");
  };
 

  return (
    <div>
      <h1>Todos</h1>
      <AddTodo />
      <CompleteAll />
      <p>{totalTasks} tasks</p>
      <p>{uncompletedTasks} uncompleted tasks</p>
      {incompleteTasks.length === 0 ? (
        <>
          <EmptyState />
        </>
      ) : (
        <>
          {incompleteTasks.map((list) => {
           const now = new Date();
           const taskDueDate = list.dueDate ? new Date(list.dueDate) : null;
           const isOverdue = taskDueDate && taskDueDate < now;
            return (
              <section key={list.id}>
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      checked={list.complete}
                      onChange={() => handleToggle(list.id)}
                    />
                  {/* Display timestamp */}
                  {list.createdAt && (
                    <p className="timestamp">
                      Added at: {list.createdAt}
                    </p>
                  )}
                    <span
                      style={{
                        textDecoration: list.complete ? "line-through" : "none",
                        color: isOverdue ? "red" : "inherit",
                      }}
                    >
                   {list.text} {list.dueDate && <span> {list.dueDate}</span>} 
                    </span>
                  </li>
                </ul>
                <RemoveTask id={list.id} />
              </section>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Todos;

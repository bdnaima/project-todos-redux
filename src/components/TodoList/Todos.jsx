// Todos.js
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "../../reducers/tasks";
import RemoveTask from "../RemoveTask/RemoveTask";
import EmptyState from "../EmptyState/EmptyState";
import CompleteAll from "../CompleteAll/CompleteAll";
import Categories from "../Categories/Categories";
import AddTodo from "../AddTodos";

// Create function to extract categories
const getCategories = (todoList) => {
  const categories = [];
  todoList.forEach((task) => {
    if (!categories.includes(task.category)) {
      categories.push(task.category);
    }
  });
  return categories;
};

const Todos = () => {
  const todoList = useSelector((state) => state.tasks.todos);
  const incompleteTasks = todoList.filter((task) => !task.complete);
  const totalTasks = useSelector((state) => state.tasks.totalTasks);

  const categories = getCategories(todoList);
  const [displayMode, setDisplayMode] = useState("all");

  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTodo({ id }));
  };

  const showAllTodos = () => {
    setDisplayMode("all");
  };

  const showByCategories = () => {
    setDisplayMode("categories");
  };

  return (
    <div>
      <h1>Todos</h1>
      <AddTodo />
      <CompleteAll />
      <p>{totalTasks} tasks</p>
      <p>{incompleteTasks.length} uncompleted tasks</p>
      {/* Buttons to switch form All Todos or by Categories */}
      <button onClick={showAllTodos}>Show All Todos</button>
      <button onClick={showByCategories}>Show By Categories</button>

      {displayMode === "all" ? (
        <>
          {incompleteTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {incompleteTasks.map((list) => {
                const now = new Date();
                const taskDueDate = list.dueDate
                  ? new Date(list.dueDate)
                  : null;
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

                        <span
                          style={{
                            textDecoration: list.complete
                              ? "line-through"
                              : "none",
                            color: isOverdue ? "red" : "inherit",
                          }}
                        >
                          {list.text}{" "}
                          {list.dueDate && <span> {list.dueDate}</span>}
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
                );
              })}
            </>
          )}
        </>
      ) : (
        // Display todos by categories
        <Categories
          categories={categories}
          todoList={todoList}
          handleToggle={handleToggle}
        />
      )}
    </div>
  );
};

export default Todos;

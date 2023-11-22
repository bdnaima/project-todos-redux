// UniqueCategories.js
import React from "react";
import RemoveTask from "../RemoveTask/RemoveTask";

const Categories = ({ categories, todoList, handleToggle }) => {
  return (
    <>
      {/* Iterate through categories and create sections */}
      {categories.map((category, index) => (
        <div key={index}>
          <h2>{category}</h2>
          <ul>
            {todoList
              .filter((task) => task.category === category && !task.complete)
              .map((task) => (
                <li key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.complete}
                    onChange={() => handleToggle(task.id)}
                  />
                  <span
                    style={{
                      textDecoration: task.complete ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                  <RemoveTask id={task.id} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Categories;

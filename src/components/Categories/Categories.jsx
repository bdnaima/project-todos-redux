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
              .filter((list) => list.category === category && !list.complete)
              .map((list) => {
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
                          checked={list.checked}
                          onChange={() => handleToggle(list.id)}
                        />

                        <span
                          style={{
                            textDecoration: list.checked
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
          </ul>
        </div>
      ))}
    </>
  );
};

export default Categories;

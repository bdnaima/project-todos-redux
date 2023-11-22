// src/reducers/tasks.js
import { createSlice } from "@reduxjs/toolkit";

const todos = [
  {
    id: 1,
    text: "Watch video on actions & reducers",
    complete: false,
    checked: false,
  },
  { id: 2, text: "Follow redux codealong", complete: false, checked: false },
  { id: 3, text: "Fork weekly assignment", complete: false, checked: false },
  { id: 4, text: "Create a todo app", complete: false, checked: false },
];

const initialState = {
  todos,
};

export const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: (state.todos.length += 1),
        text: action.payload,
        complete: false,
      };
      state.todos.push(newTodo);
    },
    removeTask: (state, action) => {
      console.log("task deleted");
      state.todos = state.todos.filter((task) => task.id !== action.payload.id);
      console.log("Updated todos:", state.todos);
    },

    completedAll: (state) => {
      console.log("completedAll Task");
      state.todos = state.todos.map((task) => ({ ...task, complete: true }));
    },
    uncompletedAll: (state) => {
      console.log("uncompletedAll Task");
      state.todos = state.todos.map((task) => ({ ...task, complete: false }));
    },

    toggleTodo: (state, action) => {
      const task = state.todos.find((todo) => todo.id === action.payload.id);

      if (task) {
        task.checked = !task.checked;
      }
    },
  },
});

export const { removeTask, toggleTodo, completedAll, uncompletedAll } =
  tasks.actions;
export default tasks.reducer;

// src/reducers/tasks.js
import { createSlice } from "@reduxjs/toolkit";

const todos = [
  {
    id: 1,
    text: "Watch video on actions & reducers",
    complete: false,
    category: "Study",
  },
  { id: 2, text: "Follow redux codealong", complete: false, category: "Study" },
  { id: 3, text: "Fork weekly assignment", complete: false, category: "Work" },
  { id: 4, text: "Create a todo app", complete: false, category: "Personal" },
];

const initialState = {
  todos,
  totalTasks: todos.length,
};

export const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { text, category } = action.payload;
      const newTodo = {
        id: (state.todos.length += 1),
        text,
        category,
        complete: false,
      };
      state.todos.push(newTodo);
    },
    removeTask: (state, action) => {
      console.log("task deleted");
      state.todos = state.todos.filter((task) => task.id !== action.payload.id);
    },

    // Toggle the completion state of a todo
    toggleTodo: (state, action) => {
      const task = state.todos.find((todo) => todo.id === action.payload.id);
      if (task) {
        task.complete = !task.complete;
      }
    },
    completedAll: (state) => {
      console.log("completedAll Task");
      state.todos = state.todos.map((task) => ({ ...task, complete: true }));
    },
    uncompletedAll: (state) => {
      console.log("uncompletedAll Task");
      state.todos = state.todos.map((task) => ({ ...task, complete: false }));
    },
  },
});

export const { removeTask, toggleTodo, completedAll, uncompletedAll } =
  tasks.actions;
export default tasks.reducer;

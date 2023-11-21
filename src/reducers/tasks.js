// src/reducers/tasks.js
import { createSlice } from "@reduxjs/toolkit";

const todos = [
  { id: 1, text: "Watch video on actions & reducers", complete: true },
  { id: 2, text: "Follow redux codealong", complete: true },
  { id: 3, text: "Fork weekly assignment", complete: true },
  { id: 4, text: "Create a todo app", complete: false },
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
        id: state.todos.length += 1,
        text: action.payload,
        complete: false,
      };
      state.todos.push(newTodo)
    },
    removeTask: (state, action) => {
      console.log("task deleted")
      state.todos = state.todos.filter((task) => task.id !== action.payload.id)
    }
  },
});


export const {
  removeTask
} = tasks.actions;
export default tasks.reducer;
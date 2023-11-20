// src/reducers/tasks.js
import { createSlice } from "@reduxjs/toolkit";

const todos = [
  { id: 1, text: "Watch video on actions & reducers", complete: false },
  { id: 2, text: "Follow redux codealong", complete: false },
  { id: 3, text: "Fork weekly assignment", complete: false },
  { id: 4, text: "Create a todo app", complete: false },
];

const initialState = {
  todos,
  totalTasks: todos.length,
  uncompletedTasks: todos.filter((todo) => !todo.complete).length,
};

export const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Toggle the completion status of a todo
    toggleTodo: (state, action) => {
      const todoToUpdate = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (todoToUpdate) {
        todoToUpdate.complete = !todoToUpdate.complete;
        if (todoToUpdate.complete) {
          state.uncompletedTasks--;
        } else {
          state.uncompletedTasks++;
        }
      }
    },
  },
});

export const { toggleTodo } = tasks.actions;

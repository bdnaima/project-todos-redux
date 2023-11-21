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
    addTodo: (state, action) => {
      const newTodo = {
        id: state.todos.length += 1,
        text: action.payload,
        complete: false,
      };
      state.todos.push(newTodo)
    },
    removeTask: (state, action) => {
      console.log("task deleted");
      state.todos = state.todos.filter((task) => task.id !== action.payload.id);

      if (removeTask) {
        state.totalTasks--;
        if (!removeTask.complete) {
          state.uncompletedTasks--;
        }
      }
    },

    // Toggle the completion state of a todo
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

export const { removeTask, toggleTodo } = tasks.actions;
export default tasks.reducer;

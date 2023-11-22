// src/reducers/tasks.js
import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

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
      const { text } = action.payload;
      const currentTime = format(new Date(), "HH:mm dd/MM");
      const newTodo = {
        id: state.todos.length + 1,
        text,
        complete: false,
        createdAt: currentTime,
      };
      state.todos.push(newTodo);
      state.totalTasks++;
      state.uncompletedTasks++;
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
    completedAll: (state) => {
      console.log("completedAll Task")
      state.todos = state.todos.map((task) => ({ ...task, complete: true }));

    },
    uncompletedAll: (state) => {
      console.log("uncompletedAll Task")
      state.todos = state.todos.map((task) => ({ ...task, complete: false }));

    }

  },
});



export const { addTodo, removeTask, toggleTodo, completedAll, uncompletedAll } = tasks.actions;
export default tasks.reducer;


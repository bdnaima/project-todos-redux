// src/reducers/tasks.js
import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

// const todos = [
//   {
//     id: 1,
//     text: "Watch video on actions & reducers",
//     complete: false,
//     category: "Study",
//     checked: false,
//   },
//   {
//     id: 2,
//     text: "Follow redux codealong",
//     complete: false,
//     category: "Study",
//     checked: false,
//   },
//   {
//     id: 3,
//     text: "Fork weekly assignment",
//     complete: false,
//     category: "Work",
//     checked: false,
//   },
//   {
//     id: 4,
//     text: "Create a todo app",
//     complete: false,
//     category: "Personal",
//     checked: false,
//   },
// ];

const todos = JSON.parse(localStorage.getItem("todos"));

const initialState = {
  todos,
  totalTasks: todos.length,
  uncompletedTasks: todos.filter((todo) => !todo.checked).length,
  dueDate: null,
};

export const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { text, dueDate, category } = action.payload;
      const currentTime = format(new Date(), "HH:mm dd/MM");
      const newTodo = {
        id: state.todos.length + 1,
        text,
        category,
        complete: false,
        checked: false,
        dueDate,
        createdAt: currentTime,
      };
      state.todos.push(newTodo);
      state.totalTasks++;
      state.uncompletedTasks++;

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTask: (state, action) => {
      console.log("task deleted");
      state.todos = state.todos.filter((task) => task.id !== action.payload.id);
      state.totalTasks--;
      state.uncompletedTasks--;

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    // Toggle the completion state of a todo
    toggleTodo: (state, action) => {
      const task = state.todos.find((todo) => todo.id === action.payload.id);
      if (task) {
        task.checked = !task.checked;
        if (task.checked) {
          state.uncompletedTasks--;
        } else {
          state.uncompletedTasks++;
        }
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    completedAll: (state) => {
      console.log("completedAll Task");
      state.todos = state.todos.map((task) => ({
        ...task,
        complete: true,
      }));
      state.totalTasks = 0;
      state.uncompletedTasks = 0;

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    uncompletedAll: (state) => {
      console.log("uncompletedAll Task");

      state.todos = state.todos.map((task) => ({
        ...task,
        complete: false,
      }));
      state.totalTasks = state.todos.length;
      state.uncompletedTasks = state.totalTasks;

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { removeTask, toggleTodo, completedAll, uncompletedAll, addTodo } =
  tasks.actions;

export default tasks.reducer;

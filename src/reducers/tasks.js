// src/reducers/tasks.js
import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

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
  dueDate: null
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
        dueDate,
        createdAt: currentTime,

      };
      state.todos.push(newTodo);
      state.totalTasks++;
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
      console.log("completedAll Task")
      state.todos = state.todos.map((task) => ({ ...task, complete: true }));

    },
    uncompletedAll: (state) => {
      console.log("uncompletedAll Task")

      state.todos = state.todos.map((task) => ({ ...task, complete: false }));

    }


  },
});


export const { removeTask, toggleTodo,  completedAll, uncompletedAll, addTodo} = tasks.actions;

export default tasks.reducer;

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
    removeTask: (state, action) => {
      console.log("task deleted")
      state.todos = state.todos.filter((task) => task.id !== action.payload.id )
    },
    completedAll: (state) => {
      console.log("completedAll Task")
      state.todos = state.todos.map((task) => ({...task, complete: true}));
    
    },
    uncompletedAll: (state) => {
      console.log("uncompletedAll Task")
      state.todos = state.todos.map((task) => ({...task, complete: false}));
    
    }
  },
});


export const {
removeTask, completedAll, uncompletedAll
} = tasks.actions;
export default tasks.reducer;
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
  reducers: {},
});

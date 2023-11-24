// src/reducers/tasks.js
import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";


const todos = JSON.parse(localStorage.getItem("todos")) ?? [];

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
        id: Date.now(),
        text,
        category,
        complete: false,
        checked: false,
        dueDate,
        createdAt: currentTime,
        subtasks: [],
      };
      state.todos.push(newTodo);
      state.totalTasks++;
      state.uncompletedTasks++;

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    addSubtask: (state, action) => {
      const { todoId, subtext } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        if (!todo.subtasks) {
          todo.subtasks = [];
        }
        const newSubtask = {
          id: Date.now(),
          subtext,
          complete: false,
        };
        todo.subtasks.push(newSubtask);
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    removeTask: (state, action) => {
      console.log("task deleted");
      state.todos = state.todos.filter((task) => task.id !== action.payload.id);
      state.totalTasks--;
      state.uncompletedTasks--;

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    sortTodosByRecent: (state) => {
      state.todos = state.todos.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
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

    toggleSubtask: (state, action) => {
      const { todoId, subtaskId } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);

      if (todo) {
        const subtask = todo.subtasks.find((subtask) => subtask.id === subtaskId);

        if (subtask) {
          subtask.complete = !subtask.complete;

          // Update the corresponding todo's checked property based on subtasks
          todo.checked = todo.subtasks.every((subtask) => subtask.complete);

        }
        //toggle uncompleted when all subtask is checked
        // if (todo.checked && subtask.complete) {
        //   if (todo.checked && subtask.complete ) {
        //     state.uncompletedTasks--;
        //   } else {
        //     state.uncompletedTasks++;
        //   }
        // }

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

export const { removeTask, toggleTodo, completedAll, uncompletedAll, addTodo, sortTasksByRecent, toggleSubtask, addSubtask } =
  tasks.actions;

export default tasks.reducer;

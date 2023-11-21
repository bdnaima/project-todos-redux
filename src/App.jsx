import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tasks } from "./reducers/tasks";
import Todos from "./components/TodoList/Todos";
import AddTodo from "./components/AddTodos";

const reducer = combineReducers({
  tasks: tasks.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <AddTodo />
      <Todos />
    </Provider>
  );
};

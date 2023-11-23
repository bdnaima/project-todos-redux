import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { tasks } from "./reducers/tasks";
import Todos from "./components/TodoList/Todos";
import Home from "./components/Home/Home";
import Project from "./components/Project/Project";



const reducer = combineReducers({
  tasks: tasks.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
      <Route  path="/" element={ <Home/> }/>
        <Route  path="/task" element={ <Todos />}/>
        <Route  path="/project" element={ <Project /> }/>
      </Routes>
      </BrowserRouter>
    </Provider>
  );
};

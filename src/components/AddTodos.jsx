import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasks } from "../reducers/tasks";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [errorMsg, setErroMsg] = useState("");

  const handleSubmitTodo = () => {
    if (newTask && newCategory) {
      dispatch(tasks.actions.addTodo({ text: newTask, category: newCategory }));
      setNewTask("");
      setNewCategory("");
    } else {
      // Handle the case where either newTask or newCategory is empty
      console.error("Please enter both task and category");
      setErroMsg("Please enter both task and category");
    }
  };
  return (
    <>
      <h1>Add todo</h1>
      <input
        type="text"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={newCategory}
        onChange={(event) => setNewCategory(event.target.value)}
      />
      <button onClick={handleSubmitTodo}> Add task</button>
      <p style={{ color: "red" }}>{errorMsg}</p>
    </>
  );
};

export default AddTodo;

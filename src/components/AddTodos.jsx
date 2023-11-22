import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasks } from "../reducers/tasks"
import { addTodo } from "../reducers/tasks";
import { format } from "date-fns";


const AddTodo = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [errorMsg, setErroMsg] = useState("");
    const [date, setDate] = useState("");

  const handleSubmitTodo = () => {
     const currentTime = format(new Date(), "HH:mm dd/MM");
    if (newTask && newCategory) {
      dispatch(tasks.actions.addTodo({ text: newTask, dueDate: date, createdAt: currentTime,  category: newCategory }));
      setNewTask("");
      setNewCategory("");
      setDate("");
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
        placeholder="New task"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />
    <input
        type="text"
        placeholder="Category"
        value={newCategory}
        onChange={(event) => setNewCategory(event.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <button onClick={handleSubmitTodo}> Add task</button>
      <p style={{ color: "red" }}>{errorMsg}</p>
    </>
  );
};

export default AddTodo;

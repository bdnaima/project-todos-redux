import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../reducers/tasks";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [date, setDate] = useState("");

  const handleSubmitTodo = () => {
    dispatch(addTodo({ text: newTask, dueDate: date }));
    setNewTask("");
    setDate("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="New task"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <button onClick={handleSubmitTodo}> Add task</button>
    </>
  );
};

export default AddTodo;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasks } from "../reducers/tasks"
import { addTodo } from "../reducers/tasks";
import { format } from "date-fns";


const AddTodo = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [date, setDate] = useState("");

    const handleSubmitTodo = () => {
        const currentTime = format(new Date(), "HH:mm dd/MM");
        dispatch(addTodo({ text: newTask, dueDate: date, createdAt: currentTime }));
        setNewTask("");
        setDate("");
    }


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

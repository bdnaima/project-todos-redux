import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasks } from "../reducers/tasks"
import { addTodo } from "../reducers/tasks";
import { format } from "date-fns";

const AddTodo = () => {
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState("");

    const handleSubmitTodo = () => {
        const currentTime = format(new Date(), "HH:mm dd/MM");
        dispatch(addTodo({ text: newTask, createdAt: currentTime }));
        setNewTask("");
    }

    return (
        <>
            <h1>Add todo</h1>
            <input
                type="text"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)} />
            <button onClick={handleSubmitTodo}> Add task</button>
        </>
    )
}

export default AddTodo;
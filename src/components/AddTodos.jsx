import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasks } from "../reducers/tasks"

const AddTodo = () => {
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState("");

    const handleSubmitTodo = () => {
        dispatch(tasks.actions.addTodo(newTask));
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
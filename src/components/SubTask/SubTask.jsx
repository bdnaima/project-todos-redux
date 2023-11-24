import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubtask, toggleSubtask } from "../../reducers/tasks";

const SubTask = ({ todoId }) => {
  const dispatch = useDispatch();
  const [showSubtask, setShowSubtask] = useState(false);
  const [subtaskText, setSubtaskText] = useState("");

  const todos = useSelector((state) => state.tasks.todos);
  const todo = todos.find((todo) => todo.id === todoId);

  const showSubtaskInput = () => {
    setShowSubtask(!showSubtask);
    console.log("Clicked");
  };
  const handleSubtask = () => {
    if (subtaskText) {
      dispatch(addSubtask({ todoId, subtext: subtaskText }));
      setSubtaskText("");
      console.log("Subtask added");
    }
  };

  const handleSubtaskToggle = (subtaskId) => {
    dispatch(toggleSubtask({todoId, subtaskId}))
  }
  return (
    <div>
      <button onClick={showSubtaskInput}>Add Subtask</button>
      <div>
        {showSubtask ? (
          <div>
            <input
              type="text"
              placeholder="Subtask"
              value={subtaskText}
              onChange={(e) => setSubtaskText(e.target.value)}
            />
            <button onClick={handleSubtask}>+</button>
          </div>
        ) : null}
      </div>
      {/* Display subtasks */}
      {todo.subtasks.map((subtask, index) => (
        <ul key={index}>
          <li>
            <input type="checkbox" checked={subtask.complete} onChange={()=> handleSubtaskToggle(subtask.id)}/>
                    <span
                      style={{
                        textDecoration: subtask.complete ? "line-through" : "none"
                      }}
                    >{subtask.subtext}</span></li>
        </ul>
      ))}
    </div>
  );
};

export default SubTask;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubtask, toggleSubtask } from "../../reducers/tasks";
import styled from "styled-components";

const Button = styled.button`
  margin-right: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #ffaa43;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ffaa43;
    opacity: 0.8;
  }

  @media (min-width: 360px) and (max-width: 740px) {
    margin-top: 3%;
  }
  @media (min-width: 280px) and (max-width: 653px) {
    margin-top: 5%;
  }
`;
const AddButton = styled.button `
padding: 2px 10px 6px 10px;
border: none;
border-radius: 4px;
background-color: #ffaa43;
color: white;
cursor: pointer;
font-size: 22px;

&:hover {
  background-color: #ffaa43;
  opacity: 0.8;
}

`;

const Checkbox = styled.input`
  margin-right: 8px;
  align-self: center;
`;

const Input = styled.input`
padding: 8px;
margin: 2% 2% 0 0;
width: 250px;
height: 33px;
border: 2px solid #FFAA43;
border-radius: 4px;
font-family: Nunito;
color: #646464;

@media (min-width: 280px) and (max-width: 653px) {
  width: 210px;
}
`;



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
    dispatch(toggleSubtask({ todoId, subtaskId }));
  };
  return (
    <div>
      <Button onClick={showSubtaskInput}>Add Subtask</Button>
      <div>
        {showSubtask ? (
          <div>
            <Input
              type="text"
              placeholder="Subtask"
              value={subtaskText}
              onChange={(e) => setSubtaskText(e.target.value)}
            />
            <AddButton onClick={handleSubtask}>+</AddButton>
          </div>
        ) : null}
      </div>
      {/* Display subtasks */}
      {todo.subtasks.map((subtask, index) => (
        <p key={index}>
          <Checkbox
           className="checkbox-round"
            type="checkbox"
            checked={subtask.complete}
            onChange={() => handleSubtaskToggle(subtask.id)}
          />
          <span
            style={{
              textDecoration: subtask.complete ? "line-through" : "none",
            }}
          >
            {subtask.subtext}
          </span>
        </p>
      ))}
    </div>
  );
};

export default SubTask;

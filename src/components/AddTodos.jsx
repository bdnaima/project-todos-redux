import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasks } from "../reducers/tasks";
import { addTodo } from "../reducers/tasks";
import { format } from "date-fns";
import Dropdown from "./Dropdown/Dropdown";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Title = styled.h1`
margin-bottom: 16px;
`;

const Input = styled.input`
padding: 8px;
margin-bottom: 16px;
width: 250px;
border: 2px solid #FFAA43;
border-radius: 4px;
font-family: Nunito;
color: #646464;
`;

const DateInput = styled.input`
padding: 8px;
margin-bottom: 16px;
width: 250px;
border: 2px solid #FFAA43;
border-radius: 4px;
font-family: Nunito;
color: #646464;
`;

const Button = styled.button`
padding: 8px 16px;
border: none;
border-radius: 4px;
background-color: #FFAA43;
color: white;
cursor: pointer;

&:hover {
    background-color: #FFAA43;
    opacity: 0.8;
}
`;

const ErrorMsg = styled.p`
color: red;
`;


const AddTodo = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [errorMsg, setErroMsg] = useState("");
  const [date, setDate] = useState("");

  const handleSubmitTodo = () => {
    const currentTime = format(new Date(), "HH:mm dd/MM");
    if (newTask && newCategory) {
      dispatch(
        tasks.actions.addTodo({
          text: newTask,
          dueDate: date,
          createdAt: currentTime,
          category: newCategory,
        })
      );
      setNewTask("");
      setNewCategory("");
      setDate("");
    } else {
      // Handle the case where either newTask or newCategory is empty
      setErroMsg("Please enter both task and category");
    }
  };

    return (
        <Container>
            <Title>Add todo</Title>
            <Input
                type="text"
                placeholder="Add task"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
            />
            <Dropdown newCategory={newCategory} setNewCategory={setNewCategory} />
            <DateInput
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
            />

            <Button onClick={handleSubmitTodo}> Add task</Button>
            <ErrorMsg>{errorMsg}</ErrorMsg>
        </Container>
    );
};

export default AddTodo;

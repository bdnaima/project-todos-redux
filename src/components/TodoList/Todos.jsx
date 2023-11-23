// Todos.js
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "../../reducers/tasks";
import RemoveTask from "../RemoveTask/RemoveTask";
import EmptyState from "../EmptyState/EmptyState";
import CompleteAll from "../CompleteAll/CompleteAll";
import Categories from "../Categories/Categories";
import AddTodo from "../AddTodos";
import styled from "styled-components";


const Container = styled.div`
  padding: 20px;
  overflow-x: auto; /* Enable horizontal scrolling */
`;

const TaskList = styled.section`
  margin-bottom: 20px;
  border: solid 2px #DCDCDC;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  // align-items: center;
`;

const CheckboxAndText = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled.div`
display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;
const Checkbox = styled.input`
margin-right: 8px;
`;

const TaskText = styled.p`
text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
`;

const DueDate = styled.span`
margin-left: auto;
margin-right: 20px;
`;

const Timestamp = styled.p`
font-size: 12px;
color: #888;

`;

const Button = styled.button`
margin-right: 10px;
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

// Create function to extract categories
const getCategories = (todoList) => {
  const categories = [];
  todoList.forEach((task) => {
    if (!categories.includes(task.category)) {
      categories.push(task.category);
    }
  });
  return categories;
};



const Todos = () => {
  const todoList = useSelector((state) => state.tasks.todos);
  const incompleteTasks = todoList.filter((task) => !task.complete);
  const uncompletedTasks = useSelector((state) => state.tasks.uncompletedTasks);
  const totalTasks = useSelector((state) => state.tasks.totalTasks);

  const categories = getCategories(todoList);
  const [displayMode, setDisplayMode] = useState("all");

  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTodo({ id }));
  };

  const showAllTodos = () => {
    setDisplayMode("all");
  };

  const showByCategories = () => {
    setDisplayMode("categories");
  };

  return (
    <Container>
      <AddTodo />
      <CompleteAll />
      <p>{totalTasks} tasks</p>
      <p>{uncompletedTasks} uncompleted tasks</p>
      {/* Buttons to switch form All Todos or by Categories */}
      <Button onClick={showAllTodos}>All Todos</Button>
      <Button onClick={showByCategories}>Categories</Button>


      {displayMode === "all" ? (
        <>
          {incompleteTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {incompleteTasks.map((list) => {
                const now = new Date();
                const taskDueDate = list.dueDate
                  ? new Date(list.dueDate)
                  : null;
                const isOverdue = taskDueDate && taskDueDate < now;
                return (
                  <TaskList key={list.id}>
                    <CheckboxAndText>
                      <ContentWrapper>
                        <Checkbox
                          className="checkbox-round"
                          type="checkbox"
                          checked={list.checked}
                          onChange={() => handleToggle(list.id)}
                        />
                        <TaskText checked={list.checked}>
                          {list.text}
                        </TaskText>

                        <DueDate style={{
                          textDecoration: list.checked
                            ? "line-through"
                            : "none",
                          color: isOverdue ? "red" : "inherit",
                        }}>
                          {list.dueDate && <span> {list.dueDate}</span>}
                        </DueDate>
                      </ContentWrapper>
                      <RemoveTask id={list.id} />
                    </CheckboxAndText>
                    {/* Display timestamp */}
                    {list.createdAt && (
                      <Timestamp>Added at: {list.createdAt}</Timestamp>
                    )}
                  </TaskList>
                );
              })}
            </>
          )}
        </>
      ) : (
        // Display todos by categories
        <Categories
          categories={categories}
          todoList={todoList}
          handleToggle={handleToggle}
        />
      )}
    </Container>
  );
};

export default Todos;

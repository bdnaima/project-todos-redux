// Todos.js
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "../../reducers/tasks";
import RemoveTask from "../RemoveTask/RemoveTask";
import EmptyState from "../EmptyState/EmptyState";
import CompleteAll from "../CompleteAll/CompleteAll";
import Categories from "../Categories/Categories";
import SortByDueDate from "../SortByDueDate/SortByDueDate";
import AddTodo from "../AddTodos";
import NavBar from "../NavBar/NavBar";
import calendar from "../../assets/calendar_icon.png";

import styled from "styled-components";
import SubTask from "../SubTask/SubTask";


const Container = styled.div`
  padding: 20px;
  overflow-x: auto; /* Enable horizontal scrolling */

  @media (min-width: 768px) {
    max-width: 50%;
    margin: auto;
  }
`;

const TaskList = styled.section`
  margin-bottom: 20px;
  border: solid 2px #dcdcdc;
  border-radius: 4px;
  display: flex;
  padding: 12px;
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

  @media (max-width: 360px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Checkbox = styled.input`
  margin-right: 8px;
  align-self: center;
`;

const TaskText = styled.p`
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
`;

const DueDate = styled.span`
  display: flex;
  margin-left: auto;
  margin-right: 20px;

  @media (max-width: 360px) {
    margin-left: 0;
  }
`;

const Timestamp = styled.p`
  font-size: 14px;
  color: #888;
  margin-left: 29px;
  margin-top: 0;

  @media (max-width: 360px) {
    margin-left: 0;
  }
`;

const DisplayTask = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin-right: 10px;
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
`;

const TaskParagraph = styled.div`
  display: flex;
  justify-content: space-between;

  // @media (max-width: 768px) {
  //   width: 66%;
  // }

  // @media (min-width: 768px) {
  //   width: 31%;
  // }

  // @media (min-width: 1024px) {
  //   width: 25%;
  // }

  // @media (min-width: 1200px) {
  //   width: 17.5%;
  // }
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
  // const [filterRecent, setFilterRecent] = useState([]);

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

  const showByDueDate = () => {
    setDisplayMode("due date");
  };

  return (

    <>
      <NavBar />
      <Container>
        <AddTodo />
        <CompleteAll />
        <TaskParagraph>
          <p>
            {uncompletedTasks} uncompleted{" "}
            {uncompletedTasks === 1 ? "task" : "tasks"}
          </p>
          <p>Total tasks: {totalTasks}</p>
        </TaskParagraph>

        {/* Buttons to switch form All Todos or by Categories */}

        <Button onClick={showAllTodos}>All Todos</Button>
        <Button onClick={showByCategories}>Categories</Button>
        <Button onClick={showByDueDate}>Due Date</Button>

        {displayMode === "all" && (
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
                          <DisplayTask>
                            <Checkbox
                              className="checkbox-round"
                              type="checkbox"
                              checked={list.checked}
                              onChange={() => handleToggle(list.id)}
                            />
                            <TaskText checked={list.checked}>
                              {list.text}
                            </TaskText>
                          </DisplayTask>
                          <DueDate
                            style={{
                              textDecoration: list.checked
                                ? "line-through"
                                : "none",
                              color: isOverdue ? "red" : "inherit",
                            }}
                          >
                            <img
                              src={calendar}
                              alt="calendar"
                              style={{ marginRight: "10px" }}
                            />
                            {list.dueDate && <span> {list.dueDate}</span>}
                          </DueDate>
                        </ContentWrapper>
                        <RemoveTask id={list.id} />
                      </CheckboxAndText>
                      <SubTask todoId={list.id} />
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
        )}
        {displayMode === "categories" && (
          // Display todos by categories
          <Categories
            categories={categories}
            todoList={todoList}
            handleToggle={handleToggle}
          />
        )}
        {displayMode === "due date" && (
          <SortByDueDate
            handleToggle={handleToggle}
          />
        )}
      </Container>
    </>
  );
};

export default Todos;

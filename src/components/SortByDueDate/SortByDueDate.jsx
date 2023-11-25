import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RemoveTask from "../RemoveTask/RemoveTask";
import calendar from "../../assets/calendar_icon.png";
import styled from "styled-components";
import EmptyState from "../EmptyState/EmptyState";
import SubTask from "../SubTask/SubTask";


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


const SortByDueDate = ({ handleToggle }) => {
    const todoList = useSelector((state) => state.tasks.todos);
    const incompleteTasks = todoList.filter((task) => !task.complete);

    incompleteTasks.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA - dateB;
    });


    return (
        <>
            {incompleteTasks.length === 0 ? (
                <EmptyState />
            ) : (
                incompleteTasks.map((task) => {
                    const now = new Date();
                    const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;
                    const isOverdue = taskDueDate && taskDueDate < now;

                    return (
                        <TaskList key={task.id}>
                            <CheckboxAndText>
                                <ContentWrapper>
                                    <DisplayTask>
                                        <Checkbox
                                            className="checkbox-round"
                                            type="checkbox"
                                            checked={task.checked}
                                            onChange={() => handleToggle(task.id)}
                                        />
                                        <TaskText checked={task.checked}>{task.text}</TaskText>
                                    </DisplayTask>
                                    <DueDate
                                        style={{
                                            textDecoration: task.checked ? "line-through" : "none",
                                            color: isOverdue ? "red" : "inherit",
                                        }}
                                    >
                                        <img
                                            src={calendar}
                                            alt="calendar"
                                            style={{ marginRight: "10px" }}
                                        />
                                        {task.dueDate && <span> {task.dueDate}</span>}
                                    </DueDate>
                                </ContentWrapper>
                                <RemoveTask id={task.id} />
                            </CheckboxAndText>
                            <SubTask todoId={task.id} />
                            {/* Display timestamp */}
                            {task.createdAt && (
                                <Timestamp>Added at: {task.createdAt}</Timestamp>
                            )}
                        </TaskList>
                    );
                })
            )}
        </>
    );
};

export default SortByDueDate;
// UniqueCategories.js
import React from "react";
import { useSelector } from "react-redux";
import RemoveTask from "../RemoveTask/RemoveTask";
import calendar from "../../assets/calendar_icon.png";
import styled from "styled-components";
import EmptyState from "../EmptyState/EmptyState";

const TaskList = styled.section`
  margin-bottom: 60px;
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

const CategoryTab = styled.div`
  border: 2px solid #dcdcdc;
  border-bottom: none;
  border-radius: 4px;
  font-size: 25px;
  background-color: #fff;
  color: #000;
  width: fit-content;
  padding: 8px;
  text-align: center;
  position: absolute;
  top: -49px;
  right: 0.5px;

  @media (max-width: 768px) {
    width: fit-content;
  }
`;

const Categories = ({ categories, todoList, handleToggle }) => {
  const uncompletedTasks = useSelector((state) => state.tasks.uncompletedTasks);

  return (
    <>
      {/* Iterate through categories and create sections */}
      {uncompletedTasks === 0 ? (
        <EmptyState />
      ) : (
        categories.map((category, index) => (
          <div key={index} style={{ position: "relative" }}>
            <ul style={{ paddingLeft: "0" }}>
              {todoList
                .filter((list) => list.category === category && !list.complete)
                .map((list) => {
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
                      {/* Display timestamp */}
                      {list.createdAt && (
                        <Timestamp>Added at: {list.createdAt}</Timestamp>
                      )}
                    </TaskList>
                  );
                })}
            </ul>
            <CategoryTab>{category}</CategoryTab>
          </div>
        ))
      )}
    </>
  );
};

export default Categories;

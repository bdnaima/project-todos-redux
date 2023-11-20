import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "../../reducers/tasks";
import RemoveTask from "../RemoveTask/RemoveTask";

const Todos = () => {
  const todoList = useSelector((state) => state.tasks.todos);
  const totalTasks = useSelector((state) => state.tasks.totalTasks);
  const uncompletedTasks = useSelector((state) => state.tasks.uncompletedTasks);

  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };
  return (
    <div>
      <h1>Todos</h1>
      <p>{totalTasks} tasks</p>
      <p>{uncompletedTasks} uncompleted tasks</p>
      {todoList.map((list) => (
        <div key={list.id}>
          <ul>
            <li>
              <input
                type="checkbox"
                checked={list.complete}
                onChange={() => handleToggle(list.id)}
              />
              <span
                style={{
                  textDecoration: list.complete ? "line-through" : "none",
                }}
              >
                {list.text}
              </span>
            </li>
          </ul>
          <RemoveTask id={list.id} />
        </div>
      ))}
    </div>
  );
};

export default Todos;

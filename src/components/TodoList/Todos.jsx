import { useSelector } from "react-redux";

const Todos = () => {
  const todoList = useSelector((state) => state.tasks.todos);
  return (
    <div>
      <h1>Todos</h1>
      {todoList.map((list) => (
        <ul key={list.id}>
          <li>{list.text}</li>
        </ul>
      ))}
    </div>
  );
};

export default Todos;

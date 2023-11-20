import { useSelector } from "react-redux";
import RemoveTask from "../RemoveTask/RemoveTask";

const Todos = () => {
  const todoList = useSelector((state) => state.tasks.todos);
  return (
    <div>
      <h1>Todos</h1>
      {todoList.map((list) => (
        <>
        <ul key={list.id}>
          <li>{list.text}</li>
        </ul>
        <RemoveTask id={list.id}/>
         </>
         
      ))}
     
    </div>
  );
};

export default Todos;

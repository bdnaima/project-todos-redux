import { useDispatch } from "react-redux";
import { removeTask } from "../../reducers/tasks";
import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";


const DeleteButton = styled.button `
background: red;
color: white;
cursor: pointer;
border: none;
padding: 1%;

&:hover {
    background: lightcoral;
}
`;

const RemoveTask = ({ id}) => {
    const dispatch = useDispatch();
    const deleteTask = ()=> {
        dispatch(removeTask({id}))
    }
  return (
    <div>
      <DeleteButton onClick={deleteTask}><RiDeleteBin6Line /></DeleteButton>
    </div>
  )
}

export default RemoveTask


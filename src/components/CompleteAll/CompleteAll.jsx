import styled from "styled-components";
import { useDispatch } from "react-redux";
import { completedAll, uncompletedAll} from "../../reducers/tasks";

const CompleteAllButton= styled.input `
`;
const CompleteAll = () => {
    const dispatch = useDispatch();
    const handleTasks = (event)=> {
      if (event.target.checked) {
        dispatch(completedAll());
      } else {
        dispatch(uncompletedAll())
      }
       
    }
  return (
    <div>
      <CompleteAllButton type="checkbox" onClick={handleTasks} />
      <label>Completed All</label>
    </div>
  )
}

export default CompleteAll;

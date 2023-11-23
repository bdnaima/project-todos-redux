import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
        <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/task"><li>Task</li></Link>
            <Link to="/project"><li>Project</li></Link>
        </ul>
      
    </div>
  )
}

export default NavBar

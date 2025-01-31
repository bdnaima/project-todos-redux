import { Link } from "react-router-dom";
import styled from "styled-components";

const UnorderedList = styled.ul`
  display: flex;
  justify-content: end;

  li {
    list-style: none;
    margin-right: 2rem;
    color: #000;
    font-size: 25px;
    font-weight: bold;
  }

  a {
    text-decoration: none;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NavBar = () => {
  return (
    <div>
      <UnorderedList>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/task">
          <li>Tasks</li>
        </Link>
      </UnorderedList>
    </div>
  );
};

export default NavBar;

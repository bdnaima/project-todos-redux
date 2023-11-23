import styled from "styled-components";

const Select = styled.select`
  width: 250px;
  padding: 8px;
  border-color: #ffaa43;
  border-width: 2px;
  margin-bottom: 16px;
  color: #646464;
`;

const Dropdown = ({ newCategory, setNewCategory }) => {
  return (
    <Select
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
    >
      <option value="Categories">Categories</option>
      <option value="Study">Study</option>
      <option value="Personal">Personal</option>
      <option value="Cleaning">Cleaning</option>
      <option value="Cooking">Cooking</option>
      <option value="Other">Other</option>
    </Select>
  );
};

export default Dropdown;

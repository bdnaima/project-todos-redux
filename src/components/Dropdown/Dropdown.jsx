const Dropdown = ({ newCategory, setNewCategory }) => {
  return (
    <select
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
    >
      <option value="Categories">Categories</option>
      <option value="Study">Study</option>
      <option value="Personal">Personal</option>
      <option value="Cleaning">Cleaning</option>
      <option value="Cooking">Cooking</option>
      <option value="Other">Other</option>
    </select>
  );
};

export default Dropdown;

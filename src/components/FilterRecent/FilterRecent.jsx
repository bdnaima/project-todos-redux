
const FilterRecent = ({ todoList, sortFunction, toggleTodo }) => {
    const sortedByRecent = sortFunction(todoList);


    return (
        <>
            {console.log(sortedByRecent)}
            {sortedByRecent.map((task) => (
                <div key={task.id}>
                    <p>{task.text}</p>
                    {/* Include toggleTodo function if needed */}
                    <button onClick={() => toggleTodo(task.id)}>Toggle</button>
                    {/* Render other task details */}
                </div>
            ))}
        </>
    )
}

export default FilterRecent;
import TodoItem from "./TodoItem";

export default function TodoList({
  list,
  toggleComplete,
  deleteTodo,
  startEdit,
  onDragStart,
  onDrop,
}) {
  return (
    <ul className="todo">
      {list.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          index={index}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          startEdit={startEdit}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />
      ))}
    </ul>
  );
}
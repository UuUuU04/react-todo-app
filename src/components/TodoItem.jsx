export default function TodoItem({
  item,
  index,
  toggleComplete,
  deleteTodo,
  startEdit,
  onDragStart,
  onDrop,
}) {
  return (
    <li
      className="todo-item"
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, index)}
    >
      <div>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => toggleComplete(index)}
        />
        <span className={item.completed ? "done" : ""}>
          {item.text}
        </span>
      </div>

      <div className="buttons">
        <button className="edit" onClick={() => startEdit(index)}>
          編集
        </button>
        <button className="delete" onClick={() => deleteTodo(index)}>
          削除
        </button>
      </div>
    </li>
  );
}

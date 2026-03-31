export default function TodoInput({ todo, setTodo, addTodo, editIndex }) {
  return (
    <div className="input-area">
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
        placeholder="やること入力"
      />
      <button onClick={addTodo}>
        {editIndex !== null ? "更新" : "追加"}
      </button>
    </div>
  );
}
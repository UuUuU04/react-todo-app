import { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList.jsx";
import TodoInput from "./components/TodoInput.jsx";

function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(false);

  // 初回読み込み
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    const theme = localStorage.getItem("theme");

    if (saved) setList(JSON.parse(saved));
    if (theme === "dark") setDark(true);
  }, []);

  // Todo保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(list));
  }, [list]);

  // テーマ保存
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const addTodo = () => {
    if (!todo) return;

    if (editIndex !== null) {
      const newList = [...list];
      newList[editIndex].text = todo;
      setList(newList);
      setEditIndex(null);
    } else {
      setList([...list, { text: todo, completed: false }]);
    }

    setTodo("");
  };

  const deleteTodo = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const newList = [...list];
    newList[index].completed = !newList[index].completed;
    setList(newList);
  };

  const startEdit = (index) => {
    setTodo(list[index].text);
    setEditIndex(index);
  };

  // フィルター
  const filteredList = list.filter((item) => {
    if (filter === "done") return item.completed;
    if (filter === "todo") return !item.completed;
    return true;
  });

  // ドラッグ
  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const newList = [...list];
    const draggedItem = newList.splice(draggedIndex, 1)[0];
    newList.splice(index, 0, draggedItem);
    setList(newList);
  };

  return (
    <div className={dark ? "container dark" : "container"}>
      <h1>🔥 Todoアプリ</h1>

      <button onClick={() => setDark(!dark)}>
        {dark ? "ライトモード" : "ダークモード"}
      </button>

      <TodoInput
        todo={todo}
        setTodo={setTodo}
        addTodo={addTodo}
        editIndex={editIndex}
      />

      <div className="filter">
        <button onClick={() => setFilter("all")}>全部</button>
        <button onClick={() => setFilter("todo")}>未完了</button>
        <button onClick={() => setFilter("done")}>完了</button>
      </div>

      <TodoList
        list={filteredList}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        startEdit={startEdit}
        onDragStart={onDragStart}
        onDrop={onDrop}
      />
    </div>
  );
}

export default App;
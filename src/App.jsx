import { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList.jsx";
import TodoInput from "./components/TodoInput.jsx";

// Firebase
import { auth, provider, database } from "./firebase.js";
import { signInWithPopup, signOut } from "firebase/auth";

import {
  ref,
  push,
  onValue
} from "firebase/database";

function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(false);

  // ユーザー状態
  const [user, setUser] = useState(null);

  // Realtime Databaseから取得
  useEffect(() => {
    const todoRef = ref(database, "todos");

    onValue(todoRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const loadedTodos = Object.values(data);
        setList(loadedTodos);
      } else {
        setList([]);
      }
    });
  }, []);

  // テーマ読み込み
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      setDark(true);
    }
  }, []);

  // テーマ保存
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // ログイン
  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  // ログアウト
  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  // Todo追加
  const addTodo = () => {
    if (!todo) return;

    const newTodo = {
      text: todo,
      completed: false,
    };

    push(ref(database, "todos"), newTodo);

    setTodo("");
  };

  // Todo削除
  const deleteTodo = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  // 完了切り替え
  const toggleComplete = (index) => {
    const newList = [...list];
    newList[index].completed = !newList[index].completed;
    setList(newList);
  };

  // 編集開始
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

  // ドラッグ開始
  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  // ドロップ
  const onDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");

    const newList = [...list];
    const draggedItem = newList.splice(draggedIndex, 1)[0];

    newList.splice(index, 0, draggedItem);

    setList(newList);
  };

  return (
    <div className={dark ? "container dark" : "container"}>
      <h1> Todoアプリ</h1>

      {/* ログインUI */}
      {user ? (
        <>
          <p>{user.displayName}</p>
          <button onClick={logout}>ログアウト</button>
        </>
      ) : (
        <button onClick={login}>Googleログイン</button>
      )}

      {/* ダークモード */}
      <button onClick={() => setDark(!dark)}>
        {dark ? "ライトモード" : "ダークモード"}
      </button>

      {/* 入力 */}
      <TodoInput
        todo={todo}
        setTodo={setTodo}
        addTodo={addTodo}
        editIndex={editIndex}
      />

      {/* フィルター */}
      <div className="filter">
        <button onClick={() => setFilter("all")}>全部</button>
        <button onClick={() => setFilter("todo")}>未完了</button>
        <button onClick={() => setFilter("done")}>完了</button>
      </div>

      {/* Todo一覧 */}
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
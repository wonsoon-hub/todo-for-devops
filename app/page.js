'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // ✅ 전체 조회
  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  // ✅ 최초 1회 호출
  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ 새 할 일 추가
  const addTodo = async () => {
    if (!title.trim()) return;
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json' },
    });
    setTitle('');
    fetchTodos();
  };

  // ✅ 완료 상태 토글
  const toggleTodo = async (id, isDone) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isDone: !isDone }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchTodos();
  };

  // ✅ 삭제
  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    fetchTodos();
  };

  return (
    <main style={{ maxWidth: 600, margin: '60px auto', fontFamily: 'Segoe UI, sans-serif', padding: 24, background: '#f9f9f9', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', fontSize: 32, marginBottom: 30, color: '#333' }}>📝 DevOps 실습용 Node 앱</h1>

      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요!"
          style={{ flex: 1, padding: '10px 12px', fontSize: 16, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button onClick={addTodo} style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          추가
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
              padding: 12,
              border: '1px solid #ddd',
              borderRadius: 8,
              background: todo.isDone ? '#e6f7ff' : '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
          >
            <span
              onClick={() => toggleTodo(todo.id, todo.isDone)}
              style={{
                textDecoration: todo.isDone ? 'line-through' : 'none',
                color: todo.isDone ? '#666' : '#000',
                cursor: 'pointer',
                flex: 1,
                opacity: todo.isDone ? 0.6 : 1,
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                marginLeft: 12,
                background: '#ff4d4f',
                color: '#fff',
                border: 'none',
                padding: '6px 10px',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
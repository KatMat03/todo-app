// src/app/page.js
'use client';

import { useReducer, useEffect, useState, useCallback } from 'react';
import { todosReducer } from '../../lib/todo.js';

export default function Page() {
  const [state, dispatch] = useReducer(todosReducer, []);
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'INIT_TODOS', payload: parsed });
      } catch (e) {
        console.log('Błąd ładowania:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(state));
    }
  }, [state, isLoaded]);

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <p style={{ color: 'white', fontSize: '1.2em' }}>Ładowanie...</p>
      </div>
    );
  }

  const addTodo = useCallback((e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch({ type: 'ADD_TODO', payload: input.trim() });
    setInput('');
  }, [input]);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const remainingTodos = state.filter(t => !t.completed).length;
  const completedTodos = state.filter(t => t.completed).length;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 600,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 25,
          boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)',
          }}
        />
        <h1 style={{ textAlign: 'center', color: '#333', fontSize: '2.5em', marginBottom: 10, fontWeight: 700, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          📝 Moja Lista Zadań 📝
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 30, fontSize: '1.1em' }}>
          {remainingTodos} pozostało | {completedTodos} ukończono
        </p>
        <form onSubmit={addTodo} style={{ display: 'flex', gap: 15, marginBottom: 30, background: '#f8f9fa', padding: 20, borderRadius: 20, boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="💡 Co chcesz zrobić dzisiaj?"
            style={{
              flex: 1,
              padding: '18px 25px',
              border: '2px solid #e9ecef',
              borderRadius: 15,
              fontSize: 18,
              background: '#ffffff',
              color: '#000000',
              outline: 'none',
            }}
          />
          <button type="submit" style={{ padding: '18px 30px', background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: 15, fontSize: 16, fontWeight: 600 }}>
            ➕ Dodaj
          </button>
        </form>

        <div style={{ maxHeight: 500, overflowY: 'auto' }}>
          {state.map((todo) => (
            <div key={todo.id} style={{ display: 'flex', alignItems: 'center', padding: '20px', marginBottom: 15, background: todo.completed ? 'linear-gradient(135deg, #a8e6cf, #88d8a3)' : 'white', borderRadius: 20, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}>
              <div onClick={() => toggleTodo(todo.id)} style={{ width: 24, height: 24, borderRadius: '50%', border: '3px solid', borderColor: todo.completed ? '#27ae60' : '#ddd', background: todo.completed ? '#27ae60' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 20, cursor: 'pointer' }}>
                {todo.completed && <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 18, fontWeight: 500, color: todo.completed ? '#2d7748' : '#333', textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
                <div style={{ fontSize: 12, color: '#888', marginTop: 5 }}>Dodano: {todo.createdAt}</div>
              </div>
              <button onClick={() => deleteTodo(todo.id)} style={{ padding: '10px 20px', background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 600 }}>
                🗑️ Usuń
              </button>
            </div>
          ))}
        </div>

        {state.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
            <div style={{ fontSize: '4em', marginBottom: 20 }}>✨</div>
            <h3>Brak zadań</h3>
            <p>Dodaj pierwsze zadanie używając pola powyżej!</p>
          </div>
        )}
      </div>
    </main>
  );
}

'use client';
import { useReducer, useState, useCallback, useEffect } from 'react';
import { todosReducer } from '@/lib/todo';
import { usePersistentTodosInitializer, useTodoPersistence } from '@/hooks/usePersistentTodos';

export default function Page() {
  const initializer = usePersistentTodosInitializer();
  const [todos, dispatch] = useReducer(todosReducer, [], initializer);
  useTodoPersistence(todos);
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);
  if (!isLoaded) return <div>Ładowanie...</div>;
  const addTodo = useCallback(
    (e) => {
      e.preventDefault();
      if (!input.trim()) return;

      dispatch({ type: 'ADD_TODO', payload: input.trim() });
      setInput('');
    },
    [input, dispatch]
  );

  const toggleTodo = useCallback(
    (id) => dispatch({ type: 'TOGGLE_TODO', payload: id }),
    [dispatch]
  );

  const deleteTodo = useCallback(
    (id) => dispatch({ type: 'DELETE_TODO', payload: id }),
    [dispatch]
  );

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Ładowanie...</p>
      </div>
    );
  }

  const remainingTodos = todos.filter((t) => !t.completed).length;
  const completedTodos = todos.filter((t) => t.completed).length;

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        padding: 20,
        fontFamily: "'Inter', Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(15px)',
          padding: 30,
          borderRadius: 25,
          width: '100%',
          maxWidth: 500,
          boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            color: 'white',
            marginBottom: 10,
            textShadow: '2px 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          📝 Moja Lista Zadań
        </h1>
        <p style={{ color: 'white', marginBottom: 20 }}>
          {remainingTodos} pozostało | {completedTodos} ukończono
        </p>

        <form
          onSubmit={addTodo}
          style={{ display: 'flex', gap: 10, width: '100%', marginBottom: 20 }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Co chcesz zrobić?"
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 12,
              border: '2px solid rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              outline: 'none',
            }}
          />
          <button
            style={{
              padding: '12px 20px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Dodaj
          </button>
        </form>

        <ul
          style={{
            listStyle: 'none',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 15,
                borderRadius: 12,
                width: '100%',
                background: todo.completed
                  ? 'rgba(168,230,207,0.3)'
                  : 'rgba(255,255,255,0.15)',
                color: todo.completed ? '#e0ffe0' : 'white',
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
              }}
            >
              <span onClick={() => toggleTodo(todo.id)}>{todo.title}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p style={{ marginTop: 20, color: 'white', opacity: 0.8 }}>Brak zadań</p>
        )}
      </div>
    </main>
  );
}
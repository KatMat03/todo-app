'use client';
import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      done: false,
      createdAt: new Date().toLocaleDateString('pl-PL')
    }]);
    setInput("");
  };

  const toggleDone = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const remainingTodos = todos.filter(todo => !todo.done).length;
  const completedTodos = todos.filter(todo => todo.done).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        maxWidth: 600,
        margin: "0 auto",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: 25,
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
        padding: "40px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Gradient dekoracja */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          background: "linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)"
        }} />

        <h1 style={{
          textAlign: "center",
          color: "#333",
          fontSize: "2.5em",
          marginBottom: 10,
          fontWeight: 700,
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
        }}>
          📝 Moja Lista Zadań 📝
        </h1>

        <p style={{
          textAlign: "center",
          color: "#666",
          marginBottom: 30,
          fontSize: "1.1em"
        }}>
          {remainingTodos} pozostało | {completedTodos} ukończono
        </p>

        {/* Formularz */}
        <form onSubmit={addTodo} style={{
          display: "flex",
          gap: 15,
          marginBottom: 30,
          background: "#f8f9ff",
          padding: 20,
          borderRadius: 20,
          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.05)"
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="💡 Co chcesz zrobić dzisiaj?"
            style={{
              flex: 1,
              padding: "18px 25px",
              border: "2px solid transparent",
              borderRadius: 15,
              fontSize: 18,
              background: "black",
              outline: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "transparent"}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            style={{
              padding: "18px 30px",
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              color: "white",
              border: "none",
              borderRadius: 15,
              fontSize: 16,
              fontWeight: 600,
              cursor: input.trim() ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              boxShadow: "0 10px 25px rgba(102, 126, 234, 0.4)",
              opacity: input.trim() ? 1 : 0.6
            }}
            onMouseOver={(e) => {
              if (input.trim()) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 15px 35px rgba(102, 126, 234, 0.5)";
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.4)";
            }}
          >
            ➕ Dodaj
          </button>
        </form>

        {/* Lista zadań */}
        <div style={{ maxHeight: 500, overflowY: "auto" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {todos.map((todo) => (
              <li key={todo.id} style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                marginBottom: 15,
                background: todo.done
                  ? "linear-gradient(135deg, #a8e6cf, #88d8a3)"
                  : "white",
                borderRadius: 20,
                boxShadow: todo.done
                  ? "0 8px 20px rgba(168, 230, 207, 0.4)"
                  : "0 8px 25px rgba(0,0,0,0.1)",
                transform: todo.done ? "scale(0.98)" : "scale(1)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "2px solid transparent",
                position: "relative",
                overflow: "hidden"
              }}>
                {/* Checkbox z animacją */}
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "3px solid",
                  borderColor: todo.done ? "#27ae60" : "#ddd",
                  background: todo.done ? "#27ae60" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 20,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }} onClick={() => toggleDone(todo.id)}>
                  {todo.done && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                    </svg>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <span style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: todo.done ? "#2d7748" : "#333",
                    textDecoration: todo.done ? "line-through" : "none",
                    opacity: todo.done ? 0.8 : 1
                  }}>
                    {todo.text}
                  </span>
                  <div style={{
                    fontSize: 12,
                    color: todo.done ? "#4aa06a" : "#888",
                    marginTop: 5
                  }}>
                    Dodano: {todo.createdAt}
                  </div>
                </div>

                {/* Przycisk usuń */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    padding: "10px 20px",
                    background: "linear-gradient(45deg, #ff6b6b, #ee5a52)",
                    color: "white",
                    border: "none",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    boxShadow: "0 6px 20px rgba(255, 107, 107, 0.4)",
                    opacity: 0.9
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 10px 30px rgba(255, 107, 107, 0.5)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 6px 20px rgba(255, 107, 107, 0.4)";
                  }}
                >
                  🗑️ Usuń
                </button>
              </li>
            ))}
          </ul>
        </div>

        {todos.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#888",
            fontSize: "1.2em"
          }}>
            <div style={{ fontSize: "4em", marginBottom: 20 }}>✨</div>
            <h3>Brak zadań</h3>
            <p>Dodaj pierwsze zadanie używając pola powyżej!</p>
          </div>
        )}
      </div>
    </div>
  );
}

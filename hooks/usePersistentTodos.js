// hooks/usePersistentTodos.js
'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { todoSchema } from '../lib/todo.js';

export function usePersistentTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('todos');
      if (saved) {
        const parsed = JSON.parse(saved);
        const validated = z.array(todoSchema).safeParse(parsed);
        setTodos(validated.success ? validated.data : []);
      }
    } catch {
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch {
      // ignorujemy błędy zapisu
    }
  }, [todos]);

  return {
    todos,
    setTodos,
    loading,
  };
}

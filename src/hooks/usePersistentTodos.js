import { useEffect, useReducer, useState } from 'react';
import { todosReducer } from '@/lib/todo';

export function usePersistentTodos() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [state, dispatch] = useReducer(
    todosReducer,
    [],
    () => {
      if (typeof window === 'undefined') return [];
      const saved = localStorage.getItem('todos');
      if (!saved) return [];
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(state));
    }
  }, [state, isLoaded]);

  return { todos: state, dispatch, isLoaded };
}

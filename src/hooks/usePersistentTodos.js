// src/hooks/usePersistentTodos.js - ZMIEŃ na to:
import { useEffect, useReducer, useState } from 'react';
import { todosReducer } from '@/lib/todo';

export function usePersistentTodosInitializer() {
  return () => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('todos');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  };
}

export function useTodoPersistence(todos) {
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
}

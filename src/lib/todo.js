import { z } from 'zod';

export const todoSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  completed: z.boolean(),
  createdAt: z.string(),
});

export function createTodo(title) {
  const todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toLocaleDateString('pl-PL'),
  };

  todoSchema.parse(todo); // walidacja

  return todo;
}

export function todosReducer(state, action) {
  switch (action.type) {
    case 'INIT_TODOS':
      return action.payload || [];
    case 'ADD_TODO':
      return [...state, createTodo(action.payload)];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

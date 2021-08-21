import { useState, useEffect, useRef } from 'react';

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  deadline: string;
};

interface IUseTodo {
  todos: Itodo[];
  nextId: number;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  createTodo: (todo: Itodo) => void;
}

export const useTodo = (): IUseTodo => {
  const [todos, setTodos] = useState<Itodo[]>([]);
  const nextId = useRef<number>(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData(todos);
  }, [todos]);

  const loadData = (): void => {
    const data: string = localStorage.getItem('todos') || '[]';
    const todos: Itodo[] = JSON.parse(data);

    nextId.current = todos.length;
    setTodos(todos);
  };

  const saveData = (todos: Itodo[]): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const toggleTodo = (id: number): void => {
    setTodos(prev =>
      prev.map((todo: Itodo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }

        return todo;
      }),
    );
  };

  const removeTodo = (id: number): void => {
    setTodos(prev => prev.filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo): void => {
    setTodos(prev =>
      prev.concat({
        ...todo,
        id: ++nextId.current,
      }),
    );
  };

  return {
    todos,
    nextId: nextId.current,
    toggleTodo,
    removeTodo,
    createTodo,
  };
};

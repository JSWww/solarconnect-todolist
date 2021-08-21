import { useState, useEffect, useRef } from 'react';

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  deadline: string;
};

interface IUseTodo {
  todos: Itodo[] | null;
  nextId: number;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  createTodo: (todo: Itodo) => void;
}

export const useTodo = (): IUseTodo => {
  const [todos, setTodos] = useState<Itodo[] | null>(null);
  const nextId = useRef<number>(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData(todos as Itodo[]);
  }, [todos]);

  const loadData = (): void => {
    const data: string = localStorage.getItem('todos') || '[]';
    const savedTodos: Itodo[] = JSON.parse(data);

    nextId.current =
      savedTodos.length === 0
        ? 0
        : Math.max.apply(
            null,
            savedTodos.map(todo => todo.id),
          );

    setTodos(savedTodos);
  };

  const saveData = (todos: Itodo[]): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const toggleTodo = (id: number): void => {
    setTodos(prev =>
      (prev as Itodo[]).map((todo: Itodo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }

        return todo;
      }),
    );
  };

  const removeTodo = (id: number): void => {
    setTodos(prev => (prev as Itodo[]).filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo): void => {
    setTodos(prev =>
      (prev as Itodo[]).concat({
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

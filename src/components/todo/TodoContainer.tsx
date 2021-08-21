import React, { ReactElement } from 'react';
import { useTodo } from './TodoService';
import TodoTemplate from './template/TodoTemplate';
import TodoHead from './template/head/TodoHead';
import TodoList from './template/list/TodoList';
import TodoCreate from './template/create/TodoCreate';
import TodoFooter from './template/footer/TodoFooter';

const TodoContainer = (): ReactElement => {
  const { todos, nextId, toggleTodo, removeTodo, createTodo } = useTodo();

  return (
    <TodoTemplate>
      <TodoHead />
      <TodoCreate nextId={nextId} createTodo={createTodo} />
      <TodoList toggleTodo={toggleTodo} removeTodo={removeTodo} todos={todos} />
      <TodoFooter todos={todos} />
    </TodoTemplate>
  );
};

export default TodoContainer;

import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Itodo } from 'components/todo/TodoService';
import TodoItem from './item/TodoItem';

interface TodoListProps {
  todos: Itodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList = ({
  toggleTodo,
  removeTodo,
  todos,
}: TodoListProps): ReactElement => {
  return (
    <TodoListBlock>
      {todos &&
        todos.map(todo => (
          <TodoItem
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            key={todo.id}
            todo={todo}
          />
        ))}
    </TodoListBlock>
  );
};

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

export default React.memo(TodoList);

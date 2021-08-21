import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';

import { Itodo } from 'components/todo/TodoService';
import Loading from 'components/common/Loading';
import TodoItem from './item/TodoItem';

interface TodoListProps {
  todos: Itodo[] | null;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList = ({
  toggleTodo,
  removeTodo,
  todos,
}: TodoListProps): ReactElement => {
  if (!todos) return <Loading style={{ marginTop: '50px' }} />;

  return (
    <TodoListBlock>
      {todos.length ? (
        todos.map(todo => (
          <TodoItem
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            key={todo.id}
            todo={todo}
          />
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
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

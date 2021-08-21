import React, { ReactElement, useState } from 'react';
import styled, { css } from 'styled-components';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';

import { Itodo } from 'components/todo/TodoService';

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({
  toggleTodo,
  removeTodo,
  todo,
}: TodoItemProps): ReactElement => {
  const [done, setDone] = useState<boolean>(todo.done);

  const handleToggle = () => {
    setDone(prev => !prev);
    toggleTodo(todo.id);
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={handleToggle}>
        {done && <CheckOutlined />}
      </CheckCircle>
      <TodoText done={done}>{todo.text}</TodoText>
      <DateText done={done}>
        {todo.deadline ? `${todo.deadline} 까지` : '기한 없음'}
      </DateText>
      <Remove onClick={() => removeTodo(todo.id)}>
        <DeleteOutlined />
      </Remove>
    </TodoItemBlock>
  );
};

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  ${props =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  color: #119955;

  ${props =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const TodoText = styled(Text)`
  flex: 1;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateText = styled(Text)`
  font-size: 14px;
  margin: 0 15px;
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
  cursor: pointer;
`;

export default React.memo(TodoItem);

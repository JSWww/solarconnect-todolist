import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { PlusCircleOutlined } from '@ant-design/icons';
import { DatePicker, Modal } from 'antd';

import { Itodo } from 'components/todo/TodoService';

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
}

const TodoCreate = ({ nextId, createTodo }: TodoCreateProps): ReactElement => {
  const [text, setText] = useState<string>('');
  const [date, setDate] = useState<moment.Moment | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!text) {
      Modal.warning({
        title: '할 일을 작성해주세요.',
      });

      return;
    }

    createTodo({
      id: nextId,
      text,
      done: false,
      deadline: date?.format('YYYY-MM-DD') || '',
    });
    setText('');
    setDate(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const disabledDate = (current: moment.Moment): boolean => {
    return current < moment().add(-1, 'days');
  };

  return (
    <InsertFormPositioner>
      <InsertForm onSubmit={handleSubmit}>
        <Input
          autoFocus
          placeholder="What's need to be done?"
          value={text}
          onChange={handleInputChange}
        />
        <DatePicker
          format="YYYY-MM-DD"
          inputReadOnly
          value={date}
          disabledDate={disabledDate}
          onChange={setDate}
        />
        <CircleButton type="submit">
          <PlusCircleOutlined />
        </CircleButton>
      </InsertForm>
    </InsertFormPositioner>
  );
};

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #dddddd;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  margin-right: 15px;

  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

const CircleButton = styled.button`
  background: #33bb77;
  width: 50px;
  height: 50px;
  font-size: 50px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default React.memo(TodoCreate);

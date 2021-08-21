import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { MONTHS, DAYS } from 'constants/constants';

const TodoHead = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer: NodeJS.Timer = setInterval(() => {
      const now: Date = new Date();
      setDate(now);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const timeFormat = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

  return (
    <TodoHeadBlock>
      <Row>
        <DateText>{DAYS[date.getDay() - 1]}</DateText>
        <DateText>{MONTHS[date.getMonth()]}</DateText>
        <DateText>{date.getDate()},</DateText>
        <DateText>{date.getFullYear()}</DateText>
      </Row>
      <Row>
        <DateText>
          {timeFormat(date.getHours() % 12 || 12)}:
          {timeFormat(date.getMinutes())}:{timeFormat(date.getSeconds())}
          {date.getHours() >= 12 ? ' p.m.' : ' a.m.'}
        </DateText>
      </Row>
    </TodoHeadBlock>
  );
};

const TodoHeadBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const Row = styled.div`
  display: flex;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

export default React.memo(TodoHead);

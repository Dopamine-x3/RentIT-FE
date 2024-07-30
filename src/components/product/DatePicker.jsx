// DateRangePicker.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 가져오기

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const DateText = styled.div`
  font-size: 15px;
  cursor: pointer;
  color: #000000;
  text-decoration: none;
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1000;
`;

const StyledCalendar = styled(Calendar)`
  border: none;
  border-radius: 10px;
  box-shadow: none;
  padding: 0;
  width: auto;
  background-color: #fff;
  

  .react-calendar__tile {
    
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }

  .react-calendar__tile:hover,
  .react-calendar__tile:active {
    background-color: #007bff;
    color: white;
  }

  .react-calendar__tile--active {
    background-color: #007bff;
    color: white;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #ff6b6b;
  }
`;

const DateRangePicker = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateClick = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    if (start && end) {
      setStartDate(start);
      setEndDate(end);
      setIsCalendarVisible(false);
    } else if (start) {
      setStartDate(start);
      setEndDate(null);
    } else if (!start && !end) {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const formatDateRange = () => {
    const start = startDate ? startDate.toDateString() : '시작일';
    const end = endDate ? endDate.toDateString() : '종료일';
    return `${start} ~ ${end}`;
  };

  return (
    <Container>
      <DateText onClick={handleDateClick}>
        {formatDateRange()}
      </DateText>

      {isCalendarVisible && (
        <CalendarContainer>
          <StyledCalendar
            onChange={handleDateChange}
            selectRange
            value={[startDate, endDate]}
          />
        </CalendarContainer>
      )}
    </Container>
  );
};

export default DateRangePicker;

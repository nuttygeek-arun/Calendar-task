import React, { useState, useEffect, useCallback, useMemo } from 'react';
import moment from 'moment';

export const Calendar = ({ date }: {date: string}) => {
  const [displayDates, setDisplayDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>();

  const getArray = useCallback((noOfDaysInMonth: number): number[] => {
    return Array.from({ length: noOfDaysInMonth }).map(
        (_, ind) => ind + 1
      );
  }, []);

  const updateRenderingItems = useCallback((weekDayInNumbers: number, renderingItems: string[]): void => {
    Array.from({ length: weekDayInNumbers }).forEach(() => {
        renderingItems.unshift('');
        renderingItems.pop();
      });
  }, [])

  useEffect(() => {
    const d = moment(date);
    setSelectedDate(d.format('D'));
    const noOfDaysInMonth: number = d.daysInMonth();
    const weekDayInNumbers: number = d.clone().startOf('month').day();
    const itemsArr: number[] = getArray(noOfDaysInMonth);
    const renderingItems: string[] = Array.from({ length: 35 }).map((v, ind) => itemsArr[ind]?.toString());
    updateRenderingItems(weekDayInNumbers, renderingItems);
    setDisplayDates(renderingItems);
  }, [date, getArray, updateRenderingItems]);

 

  const renderHeader = useMemo(() => {
    return (
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {moment(date).format('MMM')} {moment(date).format('YYYY')}
      </div>
    );
  }, [date]);

  const renderWeekDaysGrid = useMemo(() => {
    return (
      <div className={'calendar-grid header'}>
        {moment.weekdays().map((weekday, index) => (
          <div key={index} className={'date-cell header'}>{weekday.substring(0, 2)}</div>
        ))}
      </div>
    );
  }, []);

  return (
    <div className='calendar-wrapper'>
      {renderHeader}
      {renderWeekDaysGrid}
      <div className={'calendar-grid'}>
        {displayDates.map((d, index) => {
          return <div key={index} id={d?.toString()} className={`date-cell ${selectedDate === d?.toString() ? 'selected' : ''}`}>{d}</div>;
        })}
      </div>
    </div>
  );
};

import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './css/dashboard.css';
import Tooltip from 'react-tooltip';

export default function DashboardCalendar() {
  const today = new Date();

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomValues = getRange(200).map((index) => ({
    date: shiftDate(today, -index),
    count: getRandomInt(1, 3),
  }));

  return (
    <div>
      <p>Activity Log</p>
      <CalendarHeatmap
        startDate={shiftDate(today, -150)}
        endDate={today}
        values={randomValues}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
        tooltipDataAttrs={(value) => ({ 'data-tip': `${value.count ? value.count : '0'} function${value.count !== 1 ? 's' : ''} junctioned on ${value.date ? value.date.toString().slice(0, 10) : 'my day off!'}` })}
      />
      <Tooltip />
    </div>

  );
}

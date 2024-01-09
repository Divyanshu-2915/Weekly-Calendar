// Import necessary libraries and modules
import moment from "moment";
import React, { useState } from "react";
import Calendar from "react-calendar";

// Function component for a weekly calendar
function WeeklyCalendar() {
  // Use moment library for date manipulation
  const moment = require('moment');

  // Get the current date
  let today = moment();

  // Define the first and last day of the current ISO week
  const FirstDay = moment().startOf('isoWeek');
  const LastDay = moment().endOf('isoWeek');

  // Define an array of days of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // State variables for current and selected dates
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to get the dates of the current week based on a given start date
  const getWeekDates = (startDate) => {
    const weekDates = [];
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startDate.getDate() - startDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }

    return weekDates;
  };

  // Function to handle the next week button click
  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  // Function to handle the previous week button click
  const handlePrevWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  // Get the dates for the current week
  const weekDates = getWeekDates(currentDate);

  // Render the weekly calendar component
  return (
    <div className='calendar-box'
      style={{
        border: '1px solid black',
        textAlign: 'center',
        width: 'fit-content'
      }}>
      {/* Navigation and today's date display */}
      <div className='week-handle'>
        <button onClick={handlePrevWeek}>Previous Week</button>
        <button onClick={handleNextWeek}>Next Week</button>
        <br />
        <h4>Today - {today.format("DD-MM-YYYY")}</h4>
      </div>

      {/* Table for displaying days of the week */}
      <table>
        <thead>
          <tr>
            {/* Display day names in the table header */}
            {daysOfWeek.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Display each day of the week with highlighting for selected and current date */}
            {weekDates.map((date, index) => (
              <td
                key={index}
                style={{
                  flex: 1,
                  border: '1px solid #ddd',
                  padding: "10px",
                  width: "150px",
                  marginLeft: '10px',
                  textAlign: 'center',
                  background:
                    date.toDateString() === selectedDate?.toDateString() || date.toDateString() === new Date().toDateString()
                      ? 'skyblue'
                      : 'transparent',
                }}
                onClick={() => setSelectedDate(date)}>
                {date.getDate()}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Export the WeeklyCalendar component as the default export
export default WeeklyCalendar;

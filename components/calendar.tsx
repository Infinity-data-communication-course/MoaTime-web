import React, { Dispatch, SetStateAction } from "react";
import Calendar from "react-calendar";
import "./css/calendar.css";

interface CalendarProps {
  selectedDates: Date[];
  setSelectedDates: Dispatch<SetStateAction<Date[]>>;
}

export default function MultiDatePicker({
  selectedDates,
  setSelectedDates,
}: CalendarProps) {
  const handleDateClick = (date: Date) => {
    const isSelected = selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    if (isSelected) {
      setSelectedDates(
        selectedDates.filter(
          (selectedDate) => selectedDate.toDateString() !== date.toDateString()
        )
      );
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      return selectedDates.some(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
      )
        ? "selected-date" 
        : "";
    }
    return null;
  };

  return (
    <div>
      <Calendar onClickDay={handleDateClick} tileClassName={tileClassName} />
      <style>{`
        .react-calendar__month-view__weekdays abbr {
          text-decoration: none;
          font-weight: 800;
        }
        .react-calendar {
          padding: 10px;
          border: 0px;
        }
        .react-calendar__tile {
          padding: 10px;
          width: 30px;
          height: 45px;
        }
        .selected-date {
          background-color: #ddd;
          color: white;
          border-radius: 50%; 
        }
      `}</style>
    </div>
  );
}

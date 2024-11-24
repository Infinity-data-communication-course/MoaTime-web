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
  // 선택한 날짜들을 관리하는 상태
  //   const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // 날짜 클릭 핸들러
  const handleDateClick = (date: Date) => {
    const isSelected = selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    if (isSelected) {
      // 이미 선택된 날짜를 클릭하면 해당 날짜 제거
      setSelectedDates(
        selectedDates.filter(
          (selectedDate) => selectedDate.toDateString() !== date.toDateString()
        )
      );
    } else {
      // 선택되지 않은 날짜를 클릭하면 추가
      setSelectedDates([...selectedDates, date]);
    }
  };

  // 선택된 날짜에 스타일 적용
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      return selectedDates.some(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
      )
        ? "selected-date" // 선택된 날짜에 CSS 클래스 추가
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

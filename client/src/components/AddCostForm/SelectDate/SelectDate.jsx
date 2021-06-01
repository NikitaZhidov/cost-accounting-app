import classNames from "classnames";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import { DateItem } from "../..";
import localeCalendar from "../../../utils/localeCalendar";

import s from "./SelectDate.module.scss";
import { getLast3Days } from "./dateUtils";

const SelectDate = ({ inputRef }) => {
  const [primaryDateItems, setPrimaryDateItems] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const primaryDates = getLast3Days();

    setPrimaryDateItems(primaryDates);
    setSelectedDate(primaryDates[0]);
  }, []);

  const onSelectDate = (date) => {
    setSelectedDate(date);
    setPrimaryDateItems(
      primaryDateItems.map((d, i) => {
        if (i == 0) return date;
        if (d.getTime() == date.getTime()) return primaryDateItems[0];
        return d;
      })
    );
  };

  const onClickDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <input type="hidden" name={"date"} value={selectedDate} ref={inputRef} />
      {primaryDateItems &&
        primaryDateItems.map((d, i) => {
          return (
            <DateItem
              key={`${d}_${i}`}
              date={d}
              activeDate={selectedDate}
              onClickDate={onClickDate}
            />
          );
        })}
      <DatePicker
        customInput={
          <div className={classNames(s.selectDateBtn, { [s.light]: true })}>
            <SvgCalendar />
          </div>
        }
        maxDate={new Date()}
        name={"date"}
        startDate={new Date()}
        selected={selectedDate}
        onChange={onSelectDate}
        locale={localeCalendar}
        className={s.datePicker}
        popperPlacement={"bottom-end"}
      />
    </>
  );
};

export default SelectDate;

const SvgCalendar = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="30"
      height="30"
    >
      <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
    </svg>
  );
};

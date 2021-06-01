import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { AcceptButton } from "..";
import s from "./SelectRange.module.scss";

const SelectRange = ({ onClose, onAccept, initStart, initEnd }) => {
  const [startDate, setStartDate] = useState(initStart);
  const [endDate, setEndDate] = useState(initEnd);

  const acceptHandler = () => {
    onAccept(startDate, endDate);
    onClose();
  };

  const resetHandler = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const cancelHandler = () => {
    setStartDate(initStart);
    setEndDate(initEnd);
    onClose();
  };

  return (
    <div>
      <div className={s.selectRangeWrapper}>
        От:
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          dateFormat={"dd.MM.yyyy"}
          popperPlacement="botom-start"
          popperModifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
            },
          }}
        />
        До:
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
          popperPlacement="botom-start"
          dateFormat={"dd.MM.yyyy"}
          popperModifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
            },
          }}
        />
        <AcceptButton text={"Сбросить"} onClick={resetHandler} />
      </div>
      <div className={s.buttonsArea}>
        <AcceptButton text={"Отмена"} onClick={cancelHandler} cancelStyle />
        <AcceptButton text={"Принять"} onClick={acceptHandler} />
      </div>
    </div>
  );
};

export default SelectRange;

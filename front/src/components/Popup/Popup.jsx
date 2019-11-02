import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import './Popup.scss';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import parseISO from 'date-fns/parseISO'
import ko from 'date-fns/locale/ko';
import Button from '../Button/Button';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import PropTypes from 'prop-types';

const Popup = ({ startDate, endDate, title, onSave, onDelete }) => {
  const [sDate, setSDate] = useState(startDate);
  const [eDate, setEDate] = useState(endDate);
  const schedulePopup = useRef();
  const titleInput = useRef();

  useEffect(() => {
    setSDate(startDate);
    setEDate(endDate);
  }, [startDate, endDate]);


  const handleStartChange = (date) => {
    const sdate = moment(date).format('YYYY-MM-DD HH:00');
    const edate = moment(date).add(1, 'hours').format('YYYY-MM-DD HH:00');
    setSDate(sdate);
    setEDate(edate);
    //handleHidePopup();
  };

  const handleEndChange = (date) => {
    const edate = moment(date).format('YYYY-MM-DD HH:00');
    setEDate(edate);
    //handleHidePopup();
  };

  const handleHidePopup = () => {
    schedulePopup.current.style.display = 'none';
    document.getElementById('back').style.display = 'none';
  };

  const handleSave = () => {
    const title = titleInput.current.value.trim();
    if (title === '') {
      alert('일정 제목을 넣어주세요.');
      return false;
    }

    onSave(title, sDate, eDate);
  };

  const handleDelete = () => {
    onDelete(sDate);
  };

  const preventKeydown = (e) => {
    e.preventDefault();
  };

  registerLocale('ko', ko);
  return (
    <div id="schedule-popup" ref={schedulePopup}>
      <input className="todo-title-input" type="text" defaultValue={title}
             placeholder="일정 제목" ref={titleInput}/>
      <div className="date-picker-wrap">
        <DatePicker
          id="start-date-input"
          selected={parseISO(sDate)}
          onChange={handleStartChange}
          showTimeSelect
          onKeyDown={preventKeydown}
          timeFormat="HH:00"
          timeIntervals={60}
          dateFormat="yyyy년 MM월 dd일 a hh:00"
          timeCaption="time"
          locale="ko"
        /> <span>~</span> <DatePicker
        id="end-date-input"
        selected={parseISO(eDate)}
        onChange={handleEndChange}
        onKeyDown={preventKeydown}
        showTimeSelect
        showTimeSelectOnly
        timeFormat="HH:00"
        timeIntervals={60}
        dateFormat="yyyy년 MM월 dd일 a hh:00"
        minTime={setHours(setMinutes(parseISO(sDate), 0), parseInt(parseISO(sDate).getHours() + 1))}
        maxTime={setHours(setMinutes(parseISO(sDate), 0), 23)}
        locale="ko"
      />
      </div>
      <div className="btn-wrap">
        <Button type={'cancel'} buttonAction={handleHidePopup}/>
        <Button type={'del'} buttonAction={handleDelete}/>
        <Button type={'save'} buttonAction={handleSave}/>
      </div>

    </div>
  );
};

export default Popup;

Popup.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  title: PropTypes.string,
  onSave: PropTypes.func,
  onDelete: PropTypes.func
};
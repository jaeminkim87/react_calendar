import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import moment from "moment";
import Popup from '../components/Popup/Popup';
import {popActions} from "../reducers/popup";

const PopupContainer = () => {

  const dispatch = useDispatch();
  const {dateType} = useSelector(state => state.headerReducer);
  const {startDate, endDate, title, popType} = useSelector((state) => state.popupReducer);


  const hidePopup = () => {
    document.getElementById('schedule-popup').style.display = 'none';
    document.getElementById('back').style.display = 'none';
  };


  const saveTodo = async (title, sDate, term) => {

    const momentStartDate = moment(sDate);
    const year = momentStartDate.year();
    const month = momentStartDate.month() + 1;
    const day = momentStartDate.date();
    const time = momentStartDate.hour();

    const obj = {
      year: year,
      month: month,
      day: day,
      time: time,
      term: term,
      memo: title,
      type: dateType
    };

    await dispatch(popActions.saveData(obj));
    hidePopup();
  };

  const delData = async (sDate) => {
    await dispatch(popActions.delData(sDate));
    hidePopup();
  };

  const handleSaveButton = async (title, sDate, eDate) => {
    const term = moment(eDate).diff(moment(sDate), 'hours');
    await saveTodo(title, sDate, term);
  };

  const handleDeleteButton = async (sDate) => {
    await delData(sDate);
  };

  return (
    <Popup startDate={startDate} endDate={endDate}
           title={title}
           onSave={handleSaveButton}
           onDelete={handleDeleteButton}
    />
  )
};

export default PopupContainer;
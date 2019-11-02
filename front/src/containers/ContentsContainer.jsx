import React from 'react';
import moment from 'moment';
import Contents from "../components/Contents/Contents";
import {actions} from '../reducers/contents';
import {popActions} from "../reducers/popup";
import {useSelector, useDispatch} from 'react-redux';

const ContentsContainer = () => {
  const {dateType, date, week} = useSelector(state => state.headerReducer);
  const {todoLists, init} = useSelector(state => state.contentsReducer);
  const dispatch = useDispatch();

  const handleWeekCell = async (e, type) => {
    e.preventDefault();
    if(type === 'cell') {
      e.stopImmediatePropagation();
    }
    let popType = 'new';
    let sDate;
    let endDate;
    let title = '';

    const time = e.currentTarget.dataset.time;

    if(e.currentTarget.dataset.dateIdx !== undefined) {
      const dateIdx = parseInt(e.currentTarget.dataset.dateIdx);
      sDate = `${moment(document.querySelectorAll('.day-row .box')[dateIdx].id + ' ' + time.padStart(2, '0')).format('YYYY-MM-DD HH:00')}`;
      endDate = `${moment(document.querySelectorAll('.day-row .box')[dateIdx].id + ' ' + time.padStart(2, '0')).add(1, 'hours').format('YYYY-MM-DD HH:00')}`;
      title = '';
    } else {
      const term = e.currentTarget.dataset.term;
      sDate = `${moment(e.currentTarget.dataset.startDate + ' ' + time.padStart(2, '0')).format('YYYY-MM-DD HH:00')}`;
      popType = e.currentTarget.id;
      endDate = `${moment(e.currentTarget.dataset.startDate + ' ' + time.padStart(2, '0')).add(term, 'hours').format('YYYY-MM-DD HH:00')}`;
      title = `${document.getElementById(e.currentTarget.id).querySelector('.item-title').innerText}`;
    }

    await dispatch(popActions.initPopup(sDate, endDate, title, popType));
    document.getElementById('back').style.display = 'block';
    document.getElementById('schedule-popup').style.display = 'block';
  };

  const handleMonthCell = async (e, type) => {
    e.preventDefault();
    if(type === 'cell') {
      e.stopImmediatePropagation();
    }
    let popType = 'new';
    let sDate;
    let endDate;
    let title = '';

    if (e.currentTarget.dataset.time !== undefined) {
      const time = e.currentTarget.dataset.time;
      const term = e.currentTarget.dataset.term;
      sDate = `${moment(e.currentTarget.dataset.startDate + ' ' + time.padStart(2, '0')).format('YYYY-MM-DD HH:00')}`;
      popType = e.currentTarget.id;
      endDate = `${moment(e.currentTarget.dataset.startDate + ' ' + time.padStart(2, '0')).add(term, 'hours').format('YYYY-MM-DD HH:00')}`;
      title = `${document.getElementById(e.currentTarget.id).querySelector('.item-title').innerText}`;
    } else {
      sDate = `${moment(e.currentTarget.dataset.date + ' ' + new Date().getHours().toString().padStart(2, '0') + ':00').format('YYYY-MM-DD HH:00')}`;
      endDate = `${moment(e.currentTarget.dataset.date + ' ' + new Date().getHours().toString().padStart(2, '0') + ':00').add(1, 'hours').format('YYYY-MM-DD HH:00')}`;
      title = '';
    }
    await dispatch(popActions.initPopup(sDate, endDate, title, popType));
    document.getElementById('back').style.display = 'block';
    document.getElementById('schedule-popup').style.display = 'block';
  };

  const moveWeekItem = (obj) => {
    dispatch(actions.changeWeekTodoList(obj));
  };

  const moveMonthItem = (obj) => {
    dispatch(actions.changeMonthTodoList(obj));
  };

  if (!init) {
    if (dateType === 'month') {
      dispatch(actions.getMonthTodoLists(moment(date).format('YYYY-MM-DD HH:00')));
    } else if (dateType === 'week') {
      dispatch(actions.getWeekTodoLists(moment(date).week(week).startOf('week').format('YYYY-MM-DD HH:00')));
    }
  }

  return (
    <Contents onSelectMonth={handleMonthCell} onSelectWeek={handleWeekCell}
              onMoveWeekItem={moveWeekItem} onMoveMonthItem={moveMonthItem}
              date={date} type={dateType} week={week} todoLists={todoLists}/>
  )
};

export default ContentsContainer;

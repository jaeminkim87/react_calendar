import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { actions } from '../reducers/header';
import { actions as contentsActions } from '../reducers/contents';
import Header from '../components/Header/Header';

const HeaderContainer = () => {
  const {dateType, date, week} = useSelector(state => state.headerReducer);
  const dispatch = useDispatch();
  /**
   * 보여지는 달 store에 저장
   * @param month : string YYYY-MM 보여지고 있는 달
   * @param direction : string next or prev
   */
  const setMonth = ( month, direction ) => {
    dispatch(actions.setDate(calculateDate(month, direction)));
    dispatch(contentsActions.toggleInitDataStatus());
  };

  /**
   * 년도 달 계산
   * @param month string
   * @param direction string
   * @returns {string}
   */
  const calculateDate = ( month, direction ) => {
    const nowArr = month.split('-');
    let prevMonth;
    let nextMonth;
    let fullDate = '';
    const d = new Date(parseInt(nowArr[0], 10), parseInt(nowArr[1], 10));
    d.setDate(1);

    if (direction === 'prev') {
      d.setMonth(d.getMonth() - 2);
      prevMonth = new Date(d);
      fullDate = `${ prevMonth.getFullYear() }-${ (prevMonth.getMonth() + 1).toString().padStart(2, '0') }`;
    } else if (direction === 'next') {
      d.setMonth(d.getMonth());
      nextMonth = new Date(d);
      fullDate = `${ nextMonth.getFullYear() }-${ (nextMonth.getMonth() + 1).toString().padStart(2, '0') }`;
    }

    return fullDate;
  };

  /**
   * 보여지는 주 store에 저장
   * @param month : date YYYY-MM 보여지고 있는 달
   * @param week : number week
   * @param direction : string prev or next
   */
  const setWeekNumber = ( month, week, direction ) => {
    const {newMonth, newWeek} = calculateWeek(month, week, direction);
    dispatch(actions.setWeek(newMonth, newWeek));
    dispatch(contentsActions.toggleInitDataStatus());
  };

  /**
   * 앞뒤주 버튼에 대한 계산
   * @param month
   * @param week
   * @param direction
   * @returns {{newMonth: *, newWeek: *}}
   */
  const calculateWeek = ( month, week, direction ) => {
    if (direction === 'prev') {
      week -= 1;
    } else if (direction === 'next') {
      week += 1;
    }

    const monthArr = month.split('-');
    let newMonth = month;
    let newWeek = week;

    const startWeek = parseInt(moment().week(week).startOf('week').format('M'));
    const endWeek = parseInt(moment().week(week).endOf('week').format('M'));

    if (startWeek < endWeek) {
      newMonth = `${ monthArr[0] }-${ startWeek.toString().padStart(2, "0") }-${ endWeek.toString().padStart(2, "0") }`;
    } else {
      newMonth = `${ monthArr[0] }-${ startWeek.toString().padStart(2, "0") }`;
    }
    return {newMonth: newMonth, newWeek: newWeek};
  };

  /**
   * 이전 달, 주 버튼
   * @param now string YYYY-MM
   * @param week number
   */
  const handlePrev = ( now, week ) => {
    if (dateType === 'month') {
      setMonth(now, 'prev');
    } else if (dateType === 'week') {
      setWeekNumber(now, week, 'prev');
    }
  };

  /**
   * 다음 달, 주 버튼
   * @param now string YYYY-MM
   * @param week number
   */
  const handleNext = ( now, week ) => {
    if (dateType === 'month') {
      setMonth(now, 'next');
    } else if (dateType === 'week') {
      setWeekNumber(now, week, 'next');
    }
  };

  /**
   * 월, 주 버튼 선택
   * @param type string
   */
  const handleDateType = ( type ) => {
    dispatch(actions.toggleDateType(type));
    dispatch(contentsActions.toggleInitDataStatus());
  };

  return (
    <Header onPrev={ handlePrev } onNext={ handleNext } onSet={ handleDateType }
            date={ date } week={ week } type={ dateType }/>
  );
};

export default HeaderContainer;
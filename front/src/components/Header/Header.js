import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

const Header = ( {onPrev, onNext, onSet, date, week, type} ) => {
  let dateArr = date.split('-');
  let title = '';

  for (let i = 0; i < dateArr.length; i++) {
    let unit = '월';
    if (i === 0) {
      unit = '년';
      title += `${ dateArr[i] }${ unit } `;
    } else if (i === dateArr.length - 1) {
      title += `${ dateArr[i] }${ unit }`;
    } else {
      title += `${ dateArr[i] }${ unit }`;
      title += '-';
    }
  }
  return (
    <div id="header">
      <div className="header_left">
        <div
          className="prev-btn"
          onClick={ () => {
            onPrev(date, week);
          } }
        >
          Prev
        </div>
        <div className="date">{ title }</div>
        <div
          className="next-btn"
          onClick={ () => {
            onNext(date, week);
          } }
        >
          Next
        </div>
      </div>
      <div className="header_right">
        <button
          onClick={ () => {
            onSet('month');
          } }
          className={ type === 'month' ? 'selected' : '' }
        >
          월
        </button>
        <button
          onClick={ () => {
            onSet('week');
          } }
          className={ type === 'week' ? 'selected' : '' }
        >
          주
        </button>
      </div>
    </div>
  );
};

export default Header;

Header.propType = {
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  onSet: PropTypes.func,
  date: PropTypes.string,
  week: PropTypes.number,
  type: PropTypes.string
};
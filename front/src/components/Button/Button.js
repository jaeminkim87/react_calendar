import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = ({type, buttonAction}) => {
  let title;

  if (type === 'save') {
    title = '저장';
  } else if (type === 'del') {
    title = '삭제';
  } else {
    title = '취소';
  }

  return (
    <button className={`${type}-btn`} onClick={() => {buttonAction()}}>{title}</button>
  )
};

export default Button;

Button.propTypes = {
  type: PropTypes.string.isRequired,
  buttonAction: PropTypes.func
};
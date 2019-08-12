import React from 'react';
import produce from 'immer';
import moment from "moment";

export const types = {
  DATA_SAVE : "DATA_SAVE",

  DATA_DELETE : "DATA_DELETE",

  DATA_LOAD : "DATA_LOAD",
  DATA_LOAD_SUCCESS: "DATA_LOAD_SUCCESS",
  LOAD_FAILURE: "LOAD_FAILURE",
  INIT_POPUP: "INIT_POPUP",
  INIT_POPUP_SUCCESS: "INIT_POPUP_SUCCESS"
};

export const popActions = {

  getData: (dbKey) => ({
    type: types.DATA_LOAD,
    dbKey: dbKey
  }),
  getDataSuccess:(todoLists) => ({
    type: types.DATA_LOAD_SUCCESS,
    todoLists: todoLists
  }),

  saveData: (todoData) => ({
    type: types.DATA_SAVE,
    todoData: todoData
  }),

  delData: (dbKey) => ({
    type: types.DATA_DELETE,
    dbKey: dbKey
  }),


  initPopup: (startDate, endDate, title, popType) => ({
    type: types.INIT_POPUP,
    startDate: startDate,
    endDate: endDate,
    title: title,
    popType: popType
  })
};

export const initState = {
  startDate: moment().format('YYYY-MM-DD HH:00'),
  endDate : moment().add(1, 'hours').format('YYYY-MM-DD HH:00'),
  dbKey : moment().format('YYYYMMDD_HH'),
  title: '',
  popType:'new',
  todoLists: {},
  todoData: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    time: new Date().getHours(),
    term: 0,
    memo: '',
    origin_date: null
  }
};

const popupReducer = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {

      case types.DATA_SAVE: {
        draft.todoData = action.todoData;
        break;
      }

      case types.INIT_POPUP: {
        draft.startDate = action.startDate;
        draft.endDate = action.endDate;
        draft.title = action.title;
        draft.popType = action.popType;
        break;
      }

      case types.DATA_DELETE:
      case types.DATA_LOAD: {
        draft.dbKey = action.dbKey;
        break;
      }

      case types.DATA_LOAD_SUCCESS: {
        draft.todoLists = action.todoLists;
      }

      default: {
        break;
      }
    }
  });
};

export default popupReducer;
import React from 'react';
import moment from 'moment';
import produce from 'immer';

export const types = {
  GET_MONTH_CONTENT: "GET_MONTH_CONTENT",
  GET_MONTH_CONTENT_SUCCESS: "GET_MONTH_CONTENT_SUCCESS",
  GET_WEEK_CONTENT: "GET_WEEK_CONTENT",
  GET_WEEK_CONTENT_SUCCESS: "GET_WEEK_CONTENT_SUCCESS",
  CHANGE_WEEK_CONTENT: "CHANGE_WEEK_CONTENT",
  CHANGE_WEEK_CONTENT_SUCCESS: "CHANGE_WEEK_CONTENT_SUCCESS",
  CHANGE_MONTH_CONTENT: "CHANGE_MONTH_CONTENT",
  CHANGE_MONTH_CONTENT_SUCCESS: "CHANGE_MONTH_CONTENT_SUCCESS",
  TOGGLE_INIT_DATA_STATUS: "TOGGLE_INIT_DATA_STATUS",
  SET_CONTENT: "SET_CONTENT",
  LOAD_FAILURE: "LOAD_FAILURE",
  DATA_SAVE_SUCCESS: "DATA_SAVE_SUCCESS",
  DATA_DELETE_SUCCESS: "DATA_DELETE_SUCCESS"
};


export const actions = {
  getMonthTodoLists: (dateKey) => ({
    type: types.GET_MONTH_CONTENT,
    dateKey: dateKey
  }),

  getWeekTodoLists: (dateKey) => ({
    type: types.GET_WEEK_CONTENT,
    dateKey: dateKey
  }),

  getMonthTodoListsSuccess: (todoLists) => ({
    type: types.GET_MONTH_CONTENT_SUCCESS,
    todoLists: todoLists
  }),

  getWeekTodoListsSuccess: (todoLists) => ({
    type: types.GET_WEEK_CONTENT_SUCCESS,
    todoLists: todoLists
  }),

  changeWeekTodoList: (todoData) => ({
    type: types.CHANGE_WEEK_CONTENT,
    todoData: todoData
  }),

  changeWeekTodoListSuccess: (todoLists) => ({
    type: types.CHANGE_WEEK_CONTENT_SUCCESS,
    todoLists:todoLists,
    init: false
  }),

  changeMonthTodoList: (todoData) => ({
    type: types.CHANGE_MONTH_CONTENT,
    todoData: todoData
  }),

  changeMonthTodoListSuccess: (todoLists) => ({
    type: types.CHANGE_MONTH_CONTENT_SUCCESS,
    todoLists:todoLists,
    init: false
  }),


  saveDataSuccess: (todoLists) => ({
    type: types.DATA_SAVE_SUCCESS,
    todoLists: todoLists
  }),

  delDataSuccess: (todoLists) => ({
    type: types.DATA_DELETE_SUCCESS,
    todoLists: todoLists
  }),


  toggleInitDataStatus: () => ({
    type: types.TOGGLE_INIT_DATA_STATUS,
    init: false
  })
};

export const initState = {
  init: false,
  todoLists: {},
  dateKey: moment().format('YYYY-MM-DD HH:00'),
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


const contentsReducer = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case types.TOGGLE_INIT_DATA_STATUS: {
        draft.init = action.init;
        break;
      }

      case types.GET_MONTH_CONTENT:
      case types.GET_WEEK_CONTENT: {
        draft.dateKey = action.dateKey;
        break;
      }

      case types.CHANGE_WEEK_CONTENT:
      case types.CHANGE_MONTH_CONTENT: {
        draft.todoData = action.todoData;
        break;
      }

      case types.DATA_SAVE_SUCCESS:
      case types.DATA_DELETE_SUCCESS:
      case types.GET_MONTH_CONTENT_SUCCESS:
      case types.GET_WEEK_CONTENT_SUCCESS:
      case types.CHANGE_WEEK_CONTENT_SUCCESS:
      case types.CHANGE_MONTH_CONTENT_SUCCESS: {
        draft.todoLists = action.todoLists;
        draft.init = true;
        break;
      }

      default: {
        break;
      }
    }
  });
};

export default contentsReducer;

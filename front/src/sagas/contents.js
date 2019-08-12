import {all, fork, takeLatest, put, throttle, call} from 'redux-saga/effects';
import axios from 'axios';
import moment from "moment";
import "@babel/polyfill";

import {actions, types} from "../reducers/contents";

function getMonthTodoListsAPI(sDate) {
  const momentStartDate = moment(sDate);
  const year = momentStartDate.year();
  const month = (momentStartDate.month() + 1).toString().padStart(2, '0');
  return axios.get(`/todos/month/${year}/${month}`);
}

function getWeekTodoListsAPI(sDate) {
  const momentStartDate = moment(sDate);
  const year = momentStartDate.year();
  const month = (momentStartDate.month() + 1).toString().padStart(2, '0');
  const day = momentStartDate.date();
  return axios.get(`/todos/week/${year}/${month}/${day}`);
}

function changeWeekTodoListAPI(obj) {
  return axios.post(`/todos/change/`, obj);
}

function changeMonthTodoListAPI(obj) {
  return axios.post(`/todos/change/`, obj);
}

function* getMTodoLists(action) {
  try {
    const result = yield call(getMonthTodoListsAPI, action.dateKey);
    if (result.data.code === 200) {
      yield put(actions.getMonthTodoListsSuccess(result.data.data))
    } else {
      alert(result.data.msg);
      yield put({
        type: types.LOAD_FAILURE,
        error: result.data.msg,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: types.LOAD_FAILURE,
      error: e,
    });
  }
}

function* getWTodoLists(action) {
  try {
    const result = yield call(getWeekTodoListsAPI, action.dateKey);
    if (result.data.code === 200) {
      yield put(actions.getWeekTodoListsSuccess(result.data.data))
    } else {
      alert(result.data.msg);
      yield put({
        type: types.LOAD_FAILURE,
        error: result.data.msg,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: types.LOAD_FAILURE,
      error: e,
    });
  }
}

function* changeWTodoList(action) {
  try {
    const result = yield call(changeWeekTodoListAPI, action.todoData);
    if(result.data.code === 200) {
      yield put(actions.changeWeekTodoListSuccess(result.data.data));
    } else {
      alert(result.data.msg);
      yield put({
        type: types.LOAD_FAILURE,
        error: result.data.msg,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: types.LOAD_FAILURE,
      error: e
    })
  }
}

function* changeMTodoList(action) {
  try {
    const result = yield call(changeMonthTodoListAPI, action.todoData);
    if(result.data.code === 200) {
      yield put(actions.changeMonthTodoListSuccess(result.data.data));
    } else {
      alert(result.data.msg);
      yield put({
        type: types.LOAD_FAILURE,
        error: result.data.msg,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: types.LOAD_FAILURE,
      error: e
    })
  }
}

function* watchGetMonthTodoLists() {
  yield takeLatest(types.GET_MONTH_CONTENT, getMTodoLists);
}

function* watchGetWeekTodoLists() {
  yield takeLatest(types.GET_WEEK_CONTENT, getWTodoLists);
}

function* watchChangeWeekTodoList() {
  yield takeLatest(types.CHANGE_WEEK_CONTENT, changeWTodoList);
}

function* watchChangeMonthTodoList() {
  yield takeLatest(types.CHANGE_MONTH_CONTENT, changeMTodoList);
}

export default function* contentsSaga() {
  yield all([
    fork(watchGetMonthTodoLists),
    fork(watchGetWeekTodoLists),
    fork(watchChangeWeekTodoList),
    fork(watchChangeMonthTodoList)
  ])
}
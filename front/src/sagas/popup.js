import {all, fork, takeLatest, put, throttle, call} from 'redux-saga/effects';
import axios from 'axios';
import moment, {parseTwoDigitYear} from "moment";

import {popActions, types} from "../reducers/popup";
import {actions} from "../reducers/contents";

function getOneTodoListAPI(sDate) {
  const momentStartDate = moment(sDate);
  const year = momentStartDate.year();
  const month = (momentStartDate.month() + 1).toString().padStart(2, '0');
  const day = momentStartDate.date();
  const time = momentStartDate.hour();
  return axios.get(`/todos/item/${year}/${month}/${day}/${time}`);
}

function delOneTodoListAPI(sDate) {
  const momentStartDate = moment(sDate);
  const year = momentStartDate.year();
  const month = (momentStartDate.month() + 1).toString().padStart(2, '0');
  const day = momentStartDate.date();
  const time = momentStartDate.hour();
  return axios.delete(`/todos/delete/${year}/${month}/${day}/${time}`)
}

function saveOneTodoListAPI(obj) {
  return axios.post(`/todos/add/`, obj);
}

function* getTodoList(action) {
  try {
    const result = yield call(getOneTodoListAPI, action.dateKey);
    if(result.data.code === 200) {
      yield put(popActions.getDataSuccess(result.data.data))
    } else {
      alert(result.data.msg);
      yield put({
        type: types.LOAD_FAILURE,
        error: result.data.msg,
      });
    }
  } catch (e) {
    alert(result.data.msg);
    console.error(e);
    yield put({
      type: types.LOAD_FAILURE,
      error: e,
    });
  }
}

function* deleteTodoList(action) {
  try {
    const result = yield call(delOneTodoListAPI, action.dateKey);
    if(result.data.code === 200) {
      yield put(actions.delDataSuccess(result.data.data))
    } else {
      alert(result.data.msg);
      yield put({
        type: types.LOAD_FAILURE,
        error: result.data.msg,
      });
    }
  } catch (e) {
    alert(result.data.msg);
    console.error(e);
    yield put({
      type: types.LOAD_FAILURE,
      error: e,
    });
  }
}

function* saveTodoList(action) {
  try {
    const result = yield call(saveOneTodoListAPI, action.todoData);
    if(result.data.code === 200) {
      yield put(actions.saveDataSuccess(result.data.data));
    } else {
      alert(result.data.msg);
      yield put({
        type: types.LOAD_FAILURE,
        error: result.data.msg,
      });
    }
  } catch (e) {
    alert(result.data.msg);
    console.error(e);
    yield put({
      type: types.LOAD_FAILURE,
      error: e
    })
  }
}

function* watchGetTodoList() {
  yield takeLatest(types.DATA_LOAD, getTodoList);
}

function* watchDelTodoList() {
  yield takeLatest(types.DATA_DELETE, deleteTodoList);
}

function* watchSaveTodoList() {
  yield takeLatest(types.DATA_SAVE, saveTodoList);
}

export default function* popupSaga() {
  yield all([
    fork(watchGetTodoList),
    fork(watchDelTodoList),
    fork(watchSaveTodoList)
  ])
}
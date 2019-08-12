import {all, fork} from 'redux-saga/effects';
import axios from 'axios';
import contents from './contents';
import popup from './popup';

axios.defaults.baseURL = `http://localhost:8080/api`;

export default function* rootSaga() {
  yield all([
    fork(contents),
    fork(popup)
  ]);
}
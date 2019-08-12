import {combineReducers} from "redux";
import headerReducer from "./header";
import contentsReducer from './contents';
import popupReducer from "./popup";

const rootReducer = combineReducers({
  headerReducer,
  contentsReducer,
  popupReducer
});

export default rootReducer;
import moment from 'moment';
import produce from "immer";

//액션
export const types = {
  TOGGLE_THEME: "TOGGLE_THEME",
  TOGGLE_DATE_TYPE: "TOGGLE_DATE_TYPE",
  SET_DATE: "SET_DATE",
  SET_WEEK: "SET_WEEK"
};

//액션 생성 함
export const actions = {
  toggleTheme: () => ({
    type: types.TOGGLE_THEME
  }),
  toggleDateType: (dateType) => ({
    type: types.TOGGLE_DATE_TYPE,
    dateType
  }),
  setDate: (date) => {
    return ({
      type: types.SET_DATE,
      date
    });
  },
  setWeek: (date, week) => {
    return ({
      type: types.SET_WEEK,
      date,
      week
    });
  }
};


export const initState = {
  theme: 'light',
  dateType: 'month',
  date: moment().format('YYYY-MM'),
  week: moment().week()
};

const headerReducer = (state=initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case types.TOGGLE_THEME: {
        draft.theme = action.theme;
        break;
      }

      case types.TOGGLE_DATE_TYPE: {
        draft.dateType = action.dateType;
        draft.date = moment().format('YYYY-MM');
        draft.week = moment().week();
        break;
      }

      case types.SET_DATE: {
        draft.date = action.date;
        break;
      }

      case types.SET_WEEK: {
        draft.date = action.date;
        draft.week = action.week;
        break;
      }

      default: {
        break;
      }
    }
  });
};

export default headerReducer;
import contentsReducer, * as contentsActions from "./contents";
import moment from 'moment';

describe('contents', () => {
  describe('actions', () => {
    const dateKey = '';
    const todoLists = {};
    const todoData = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      time: new Date().getHours(),
      term: 0,
      memo: '',
      origin_date: null
    };
    const init = false;
    it('Contents actions가 만들어져아 합니다.', () => {

      const expectedActions = [
        {
          type: 'GET_MONTH_CONTENT',
          dateKey
        },
        {
          type: 'GET_WEEK_CONTENT',
          dateKey
        },
        {
          type: 'GET_MONTH_CONTENT_SUCCESS',
          todoLists
        },
        {
          type: 'GET_WEEK_CONTENT_SUCCESS',
          todoLists
        },
        {
          type: 'CHANGE_WEEK_CONTENT',
          todoData
        },
        {
          type: 'CHANGE_WEEK_CONTENT_SUCCESS',
          todoLists,
          init: false
        },
        {
          type: 'CHANGE_MONTH_CONTENT',
          todoData
        },
        {
          type: 'CHANGE_MONTH_CONTENT_SUCCESS',
          todoLists,
          init: false
        },
        {
          type: 'DATA_SAVE_SUCCESS',
          todoLists
        },
        {
          type: 'DATA_DELETE_SUCCESS',
          todoLists
        },
        {
          type: 'TOGGLE_INIT_DATA_STATUS',
          init: init
        }
      ];

      const actions = [
        contentsActions.actions.getMonthTodoLists(dateKey),
        contentsActions.actions.getWeekTodoLists(dateKey),
        contentsActions.actions.getMonthTodoListsSuccess(todoLists),
        contentsActions.actions.getWeekTodoListsSuccess(todoLists),
        contentsActions.actions.changeWeekTodoList(todoData),
        contentsActions.actions.changeWeekTodoListSuccess(todoLists),
        contentsActions.actions.changeMonthTodoList(todoData),
        contentsActions.actions.changeMonthTodoListSuccess(todoLists),
        contentsActions.actions.saveDataSuccess(todoLists),
        contentsActions.actions.delDataSuccess(todoLists),
        contentsActions.actions.toggleInitDataStatus()
      ];
      expect(actions).toEqual(expectedActions);
    });
  });
  describe('reducer', () => {
    let state = contentsReducer(undefined, {});
    let dummyTodoLists = {
      code: 200,
      data: {
        "20190811_19": {
          term: "1",
          memo: "hello"
        }
      }
    };
    let dummyTodoData = {
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date(),
      time: moment().hour(),
      term: 0,
      memo: '',
      origin_date: null
    };
    it('initState가 반환 되어야 합니다.', () => {
      expect(state).toHaveProperty('init', false);
      expect(state).toHaveProperty('todoLists', {});
      expect(state).toHaveProperty('dateKey', moment().format('YYYY-MM-DD HH:00'));
      expect(state).toHaveProperty('todoData', {
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date(),
        time: moment().hour(),
        term: 0,
        memo: '',
        origin_date: null
      });
    });

    it('toggleInitDataStatus 액션 함수 동작 확인', () => {
      state = contentsReducer(state, contentsActions.actions.toggleInitDataStatus());
      expect(state).toHaveProperty('init', false);
    });

    it('getMonthTodoLists 액션 함수 동작 확인', () => {
      state = contentsReducer(state, contentsActions.actions.getMonthTodoLists(moment('2019-08-11 11:00').format('YYYY-MM-DD HH:00')));
      expect(state).toHaveProperty('dateKey', '2019-08-11 11:00');
    });

    it('getWeekTodoLists 액션 함수 동작 확인', () => {
      state = contentsReducer(state, contentsActions.actions.getWeekTodoLists(moment().week(moment('2019-08-13 11:00').week()).startOf('week').format('YYYY-MM-DD HH:00')));
      expect(state).toHaveProperty('dateKey', '2019-08-11 00:00');
    });

    it('getMonthTodoListsSuccess 액션 함수 동작 확인',() => {
      state = contentsReducer(state, contentsActions.actions.getMonthTodoListsSuccess(dummyTodoLists));
      expect(state).toHaveProperty('todoLists', dummyTodoLists);
    });

    it('getWeekTodoListsSuccess 액션 함수 동작 확인', () => {
      state = contentsReducer(state, contentsActions.actions.getWeekTodoListsSuccess(dummyTodoLists));
      expect(state).toHaveProperty('todoLists', dummyTodoLists);
      expect(state).toHaveProperty('init', true);
    });

    it('changeWeekTodoListSuccess 액션 함수 동작 확인', () => {
      state = contentsReducer(state, contentsActions.actions.changeWeekTodoListSuccess(dummyTodoLists));
      expect(state).toHaveProperty('todoLists', dummyTodoLists);
      expect(state).toHaveProperty('init', true);
    });

    it('changeMonthTodoListSuccess 액션 함수 동작 확인', () => {
      state = contentsReducer(state, contentsActions.actions.changeMonthTodoListSuccess(dummyTodoLists));
      expect(state).toHaveProperty('todoLists', dummyTodoLists);
      expect(state).toHaveProperty('init', true);
    });

    it('saveDataSuccess 액션 함수 동작 확인', () => {
      state = contentsReducer(state, contentsActions.actions.saveDataSuccess(dummyTodoLists));
      expect(state).toHaveProperty('todoLists', dummyTodoLists);
      expect(state).toHaveProperty('init', true);
    });

    it('delDataSuccess 액션 함수 동작 확인', () => {
      state = contentsReducer(state, contentsActions.actions.delDataSuccess(dummyTodoLists));
      expect(state).toHaveProperty('todoLists', dummyTodoLists);
      expect(state).toHaveProperty('init', true);
    });

    it('changeWeekTodoList 액션 함수 동작 확인', () => {
      state = contentsReducer(state, contentsActions.actions.changeWeekTodoList(dummyTodoData));
      expect(state).toHaveProperty('todoData', dummyTodoData);
    });

    it('changeMonthTodoList 액션 함수 동작 확인', () => {
      state = contentsReducer(state, contentsActions.actions.changeMonthTodoList(dummyTodoData));
      expect(state).toHaveProperty('todoData', dummyTodoData);
    });
  });
});
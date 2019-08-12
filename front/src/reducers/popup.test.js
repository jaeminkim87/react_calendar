import popupReducer, * as popupActions from "./popup";
import moment from 'moment';

describe('contents', () => {
  describe('actions', () => {
    let startDate = moment('2019-08-11 00:00').format('YYYY-MM-DD HH=00');
    let endDate = moment('2019-08-11 00:00').add(1, 'hours').format('YYYY-MM-DD HH=00');
    let dbKey = moment('2019-08-11 00:00').format('YYYYMMDD_HH');
    let title = '';
    let popType = 'new';
    let todoLists = {};
    let todoData = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDay(),
      time: new Date().getHours(),
      term: 0,
      memo: '',
      origin_date: null
    };

    it('Popup actions가 만들어져아 합니다.', () => {
      const expectedActions = [
        {
          type: 'DATA_LOAD',
          dbKey
        },
        {
          type: 'DATA_LOAD_SUCCESS',
          todoLists
        },
        {
          type: 'DATA_SAVE',
          todoData
        },
        {
          type: 'DATA_DELETE',
          dbKey
        },
        {
          type: 'INIT_POPUP',
          startDate: startDate,
          endDate: endDate,
          title: title,
          popType: popType
        },
      ];

      const actions = [
        popupActions.popActions.getData(dbKey),
        popupActions.popActions.getDataSuccess(todoLists),
        popupActions.popActions.saveData(todoData),
        popupActions.popActions.delData(dbKey),
        popupActions.popActions.initPopup(startDate, endDate, title, popType)
      ];
      expect(actions).toEqual(expectedActions);
    });
  });
  describe('reducer', ()=>{
    let state = popupReducer(undefined, {});
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
      expect(state).toHaveProperty('startDate', moment().format('YYYY-MM-DD HH:00'));
      expect(state).toHaveProperty('endDate', moment().add(1, 'hours').format('YYYY-MM-DD HH:00'));
      expect(state).toHaveProperty('dbKey', moment().format('YYYYMMDD_HH'));
      expect(state).toHaveProperty('title','');
      expect(state).toHaveProperty('popType','new');
      expect(state).toHaveProperty('todoLists',{});
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

    it('getData 액션 함수 동작 확인', () => {
      state = popupReducer(state, popupActions.popActions.getData(moment('2019-08-11 00:00').format('YYYYMMDD_HH')));
      expect(state).toHaveProperty('dbKey', '20190811_00');
    });

    it('getDataSuccess 액션 함수 동작 확인', () => {
      state = popupReducer(state, popupActions.popActions.getDataSuccess(dummyTodoLists));
      expect(state).toHaveProperty('todoLists', dummyTodoLists);
    });

    it('saveData 액션 함수 동작 확인', () => {
      state = popupReducer(state, popupActions.popActions.saveData(dummyTodoData));
      expect(state).toHaveProperty('todoData', dummyTodoData);
    });

    it('delData 액션 함수 동작 확인', () => {
      state = popupReducer(state, popupActions.popActions.delData(moment('2019-08-11 00:00').format('YYYYMMDD_HH')));
      expect(state).toHaveProperty('dbKey', '20190811_00');
    });

  });
});
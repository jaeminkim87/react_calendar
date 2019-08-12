import headerReducer, * as headerActions from './header';
import moment from 'moment';

describe('header', () => {
  describe('actions', () => {
    it('Header actions가 만들어져야 합니다.', () => {
      const dateType = '';
      const date = undefined;
      const week = undefined;
      const expectedActions = [
        {
          type: 'TOGGLE_DATE_TYPE',
          dateType,
        },
        {
          type: 'SET_DATE',
          date,
        },
        {
          type: 'SET_WEEK',
          date,
          week
        }
      ];
      const actions = [
        headerActions.actions.toggleDateType(dateType),
        headerActions.actions.setDate(date),
        headerActions.actions.setWeek(week)
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('reducer', () => {
    let state = headerReducer(undefined, {});
    it('initialState가 반환 되어야 합니다.', () => {
      expect(state).toHaveProperty('dateType', 'month');
      expect(state).toHaveProperty('date', `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`);
      expect(state).toHaveProperty('week', moment().week());
    });

    it('DATE가 제대로 설정 되어야 합니다.', () => {
      state = headerReducer(state, headerActions.actions.setDate(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`));
      expect(state).toHaveProperty('date', moment().format('YYYY-MM'));
    });

    it('WEEK가 제대로 설정 되어야 합니다.', () => {
      state = headerReducer(state, headerActions.actions.setWeek(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDay().toString().padStart(2, '0')}`, moment().week()));
      expect(state).toHaveProperty('week', moment().week());
    });
  });
});
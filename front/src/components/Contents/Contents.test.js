import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Contents from "./Contents";
import moment from "moment";
configure({ adapter: new Adapter() });

describe('Contents', () => {
  let monthComponent = null;
  let weekComponent = null;
  const mockSelectMonth = jest.fn();
  const mockSelectWeek = jest.fn();
  const mockMoveWeekItem = jest.fn();
  const mockMoveMonthItem = jest.fn();
  const mockTodoLists = {};

  it('월 렌더링 체크', () => {
    monthComponent = shallow(<Contents date={moment().format('YYYY-MM')}
                                  type={"month"}
                                  week={moment().week()}
                                  onSelectMonth={mockSelectMonth}
                                  onSelectWeek={mockSelectWeek}
                                  onMoveWeekItem={mockMoveWeekItem}
                                  onMoveMonthItem={mockMoveMonthItem}
                                  todoLists={mockTodoLists}
    />);
  });

  it('달력 날짜 확인', () => {
    expect(monthComponent.find(`.t-${moment().format('YYYY-MM-01')}`).exists()).toEqual(true);
  });

  it('달력 날짜 클릭', () => {
    const date = monthComponent.find(`.t-${moment().format('YYYY-MM-01')}`);
    date.simulate('click');
    expect(mockSelectMonth.mock.calls.length).toBe(1);
  });

  it('주 렌더링 체크', () => {
    weekComponent = shallow(<Contents date={moment().format('YYYY-MM')}
                                  type={"week"}
                                  week={moment().week()}
                                  onSelectMonth={mockSelectMonth}
                                  onSelectWeek={mockSelectWeek}
                                  onMoveWeekItem={mockMoveWeekItem}
                                  onMoveMonthItem={mockMoveMonthItem}
                                  todoLists={mockTodoLists}
    />);
  });

  it('주 날짜 클릭', () => {
    const date = weekComponent.find('.droppable');
    date.at(0).simulate('click');
    expect(mockSelectWeek.mock.calls.length).toBe(1);
  });

});
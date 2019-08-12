import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Popup from "./Popup";
import moment from "moment";

configure({adapter: new Adapter()});
moment.locale('ko');

describe('Popup', () => {
  let component = null;
  const mockSave = jest.fn();
  const mockDelete = jest.fn();

  it("팝업 렌더링 확인", () => {
    component = mount(<Popup startDate={ moment().format('YYYY-MM-DD HH:00') }
                               endDate={ moment().add(1, "hours").format('YYYY-MM-DD HH:00') }
                               title="테스트"
                               onSave={ mockSave }
                               onDelete={ mockDelete }
    />);
  });

  it("제목 검사", () => {
    const titleElement = component.find('.todo-title-input');
    expect(titleElement.text("테스트"));
  });

  it('시작 날짜 검사', () => {
    const startDateElement = component.find('#start-date-input');
    expect(moment(startDateElement.get(0).props.selected).format('YYYY년 MM월 DD일 A HH:00')).toBe(moment().format('YYYY년 MM월 DD일 A HH:00'))
  });

  it('종료 날짜 검사', () => {
    const endDateElement = component.find('#end-date-input');
    expect(moment(endDateElement.get(0).props.selected).format('YYYY년 MM월 DD일 A HH:00')).toBe(moment().add(1,"hours").format('YYYY년 MM월 DD일 A HH:00'))
  });

  it('저장 버튼 검사', () => {
    const saveBtn = component.find('.save-btn');
    saveBtn.simulate('click');
    expect(mockSave.mock.calls.length).toBe(1);
  });

  it('삭제 버튼 검사', () => {
    const delteBtn = component.find('.del-btn');
    delteBtn.simulate('click');
    expect(mockDelete.mock.calls.length).toBe(1);
  });

});
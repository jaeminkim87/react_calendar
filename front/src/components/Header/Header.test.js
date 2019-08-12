import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from "./Header";
import moment from "moment";
configure({ adapter: new Adapter() });

describe('Header', ()=> {
  let component = null;
  const mockPrev = jest.fn();
  const mockNext = jest.fn();
  const mockSet = jest.fn();

  it("상단 렌더링 확인", ()=> {
    component = shallow(<Header onPrev={mockPrev}
                                onNext={mockNext}
                                onSet={mockSet}
                                date={`${moment().format('YYYY-MM')}`}
                                week={moment().week()}
    />);
  });

  it('이전 월 확인', () => {
    const prevBtn = component.find('.prev-btn');
    const dateTitle = component.find('.date');

    prevBtn.simulate('click');
    expect(dateTitle.text(moment().subtract(1, 'month').format('YYYY-MM')))
  });

  it('다음 월 확인', () => {
    const prevBtn = component.find('.next-btn');
    const dateTitle = component.find('.date');

    prevBtn.simulate('click');
    expect(dateTitle.text(moment().format('YYYY-MM')))
  });

  it('월 버튼', () => {
    const btns = component.find('.header_right button');

    btns.at(0).simulate('click');
    expect(mockSet.mock.calls.length).toBe(1);
  });

  it('주 버튼', () => {
    const btns = component.find('.header_right button');

    btns.at(1).simulate('click');
    expect(mockSet.mock.calls.length).toBe(2);
  });
});
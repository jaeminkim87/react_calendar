import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';
configure({ adapter: new Adapter() });

describe('Button', () => {
  let component = null;

  it('렌더링 체크', () => {
    component = shallow(<Button type={'save'}/>);
  });

  it('버튼명 검사', () => {
    expect(component.find('.save-btn').text('저장'));
  })
});
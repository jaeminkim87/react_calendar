import React from 'react';

import PopupContainer from "./containers/PopupContainer";
import HeaderContainer from "./containers/HeaderContainer";
import ContentsContainer from './containers/ContentsContainer';

const App = () => {
  return (
    <div id="calendar-wrap">
      <PopupContainer/>
      <HeaderContainer/>
      <ContentsContainer/>
    </div>
  );
};

export default App;
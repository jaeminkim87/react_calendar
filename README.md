# 카카오 페이 사전 과제 
19.08.06 ~ 19.08.13 (1차)

## 사용법
~~~
1. Redis 설치
brew install redis
brew services start redis

2. npm 설치
cd kakao_pay_frontend_1908
npm install

3. 테스트 (Front, Backend 별도의 스크립트로 구성되어 있음)
npm run start-back-server
npm run test

4. 실행 (Front, Backend 서버(7777, 8080)와 webpack 빌드 한번 실행)
npm run start
~~~

## 접속
http://localhost:7777

## 구조

크게 Backend, Frontend로 구성되어 있습니다.
* Frontend는 nodejs + React16 + React-Saga + Redux 등 사용하였습니다.
* Backend는 nodejs + express + redis를 기반으로 API 서버 역활을 합니다.
* 테스트로는 Front에서는 Jest, Enzyme, Saga용 테스트 라이브러리 사용하였으며, 
Backend에서는 Mocha, Chai를 사용하였습니다.

## 문제 해결 전략
~~~
1. In-memory-DB인 Redis로 Rest API 작성.
* Redis는 처음 써보다 보니 개발보다는 DB 구조 구성하는데에 있어서 시간이 걸림
* Key-field-value이다보니 유니크한 값인 key를 기준으로 search를 해야해서 등록한 
  Todo에 대한 YYYYMMDD_HH 값으로 생성함
* 확실히 빠르긴 한데 Mysql에 익숙해져 있어서 괜찮은건지 모르겠음.   

2. 주요 기능인 달력에 Todo 리스트를 생성하는 것이기에 크게 3부분으로 생각해서 작업함
* Header 부분
- 해당 부분은 월, 주 선택 및 이전, 다음 버튼이 있음
- 월, 주에 대한 상태값을 redux에 저장하여 각 상황에 맞는 쓸수 있게 함
- 각 상태값에 따라 이전, 다음 버튼을 눌러 해당 월이나 주에 대한 값을 redux에 저장
- 디자인은 간단하게 작성하였습니다.

* Contents 부분
- 해당 부분은 달력이 월, 주로 구별되어 보여짐
- 각 셀에 Todo를 등록 및 수정 삭제가 가능해야하며, Drag and Drop이 가능해야함.
- 각 셀 등록 삭제 이동 등에 대해서는 React-Saga를 사용하여 API의 비동기적으로 처리하게 함.
- Drag and Drop은 HTML5의 attribute인 draggable을 사용하여 작성함.

* 등록 Popup 부분
- 해당 부분은 제목과 시작 시간과 끝 시간을 지정할 수 있음
- DatePicker를 구글 검색 후 괜찮은 것을 골라 사용하였음.
- 시작 날짜와 시간을 고르면 끝 시간을 고를때 범위를 지정하여 최대 23시간 가능하게 함.
- 일정 등록, 삭제에 대해서 React-Saga를 사용하여 작업함
~~~

## 시간이 되면 추가하고픈 부분
1. 다크모드
2. 1시간 단위가 아닌 5~10분 정도의 간격의 일정이 가능토록 변경
3. 멀티 유저
4. 문서화 
5. 공휴일 및 음력 삽입
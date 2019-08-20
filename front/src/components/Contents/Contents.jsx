import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import './Contents.scss';
import PropTypes from 'prop-types';

// 달력 부분
const Contents = ({ date, type, week, todoLists, onSelectMonth,
                    onSelectWeek, onMoveWeekItem, onMoveMonthItem }) => {
  moment.locale('ko');

  const dayStringGenerate = (type) => {
    const dayString = [];
    let emptyBox = '';
    if (type === 'week') {
      emptyBox = (
        <div className="box" id="empty-week" key="empty-week" />);
    }
    dayString.push(
      <div className="row week-string" key="week-string">
        { emptyBox }
        {
          moment.weekdaysShort().map((n, i) => {
            const key = `week-string-${i}`;
            let weekday = '';
            if (i === 0) {
              weekday = 'sun';
            } else if (i === 6) {
              weekday = 'sat';
            }
            return (
              <div className={`box ${weekday}`} id={key} key={key}>
                <div className="text">{ n }</div>
              </div>
            );
          })
        }
      </div>,
    );
    return dayString;
  };

  const sortTodoLists = (todoLists) => {
    const ordered = {};
    Object.keys(todoLists).sort().forEach((key) => {
      ordered[key] = todoLists[key];
    });
    return ordered;
  };

  const dateTransform = (key) => {
    const dateArr = key.split('_');
    const date = moment(dateArr[0]).format('YYYY-MM-DD');
    const term = parseInt(todoLists[key].term);
    const startTime = parseInt(dateArr[1], 10);
    const endTime = startTime + term;
    const title = todoLists[key].memo;

    return {
      date,
      startTime,
      endTime,
      title,
      term,
    };
  };

  const todoMonthListsGenerate = (todoLists) => {
    if (Object.keys(todoLists).length !== 0) {
      document.querySelectorAll('.schedule-wrap').forEach((el) => {
        el.innerHTML = '';
      });
      Object.keys(todoLists).forEach((key) => {
        const { date, startTime, endTime, term, title } = dateTransform(key);

        const list = document.createElement('div');
        list.id = `todo-${key}`;
        list.className = 'month-todo';
        list.dataset.startDate = `${date}`;
        list.dataset.time = `${startTime}`;
        list.dataset.term = `${term}`;
        list.setAttribute('draggable', 'true');
        list.addEventListener('dragstart', (ev) => {
          ev.dataTransfer.setData('Text', ev.target.id);
        });
        list.addEventListener('click', (ev) => {
          ev.preventDefault();
          onSelectMonth(ev, 'cell');
        });
        list.innerHTML = `${moment().hour(startTime).format('A hh:00')} <span class="item-title">${title}</span>`;

        if (document.getElementById(date) !== null) {
          document.getElementById(date).querySelector('.schedule-wrap').appendChild(list);
        }
      });
    }
  };

  const todoWeekListsGenerate = (todoLists) => {
    if (Object.keys(todoLists).length !== 0) {
      document.querySelectorAll('.schedule-wrap').forEach((el) => {
        el.innerHTML = '';
      });
      Object.keys(todoLists).forEach((key) => {
        const { date, startTime, term, title } = dateTransform(key);

        const list = document.createElement('div');
        list.id = `item-${date}_${startTime}`;
        list.className = `todo-item start-${startTime} item-${term}`;
        list.dataset.startDate = `${date}`;
        list.dataset.time = `${startTime}`;
        list.dataset.term = `${term}`;
        list.setAttribute('draggable', 'true');
        list.addEventListener('dragstart', (ev) => {
          ev.target.style.height = '60px';
          ev.dataTransfer.setData('Text', ev.target.id);
        });

        list.addEventListener('click', (ev) => {
          ev.preventDefault();
          onSelectWeek(ev, 'cell');
        });
        list.innerHTML = `<span class="item-title">${title}</span><br>${moment().hour(startTime).format('A hh:00')}`;

        if (document.getElementById(date) !== null) {
          document.getElementById(date).querySelector('.schedule-wrap').appendChild(list);
        }
      });
    }
  };

  const dragOverEvent = (ev) => {
    ev.preventDefault();
  };

  const dropEvent = (ev) => {
    const data = ev.dataTransfer.getData('Text');
    const itemInfo = document.getElementById(data);

    // ev.target.appendChild(document.getElementById(data));
    const dateString = ev.target.id.split('-');
    const obj = {
      year: dateString[0],
      month: dateString[1],
      day: dateString[2],
      time: itemInfo.dataset.time,
      term: itemInfo.dataset.term,
      memo: itemInfo.querySelector('.item-title').innerText,
      type: 'month',
      origin_date: `${itemInfo.dataset.startDate.replace(/-/g, '')}_${itemInfo.dataset.time.toString().padStart(2, '0')}`,
    };

    onMoveMonthItem(obj);

    ev.preventDefault();
  };

  const dropWeekEvent = (ev) => {
    const data = ev.dataTransfer.getData('Text');
    const itemInfo = document.getElementById(data);
    const targetInfo = document.querySelector('.day-row').querySelectorAll('.box')[ev.target.dataset.dateIdx];
    const dateString = targetInfo.id.split('-');
    const obj = {
      year: dateString[0],
      month: dateString[1],
      day: dateString[2],
      time: ev.target.dataset.time,
      term: itemInfo.dataset.term,
      type: 'week',
      memo: itemInfo.querySelector('.item-title').innerText,
      origin_date: `${itemInfo.dataset.startDate.replace(/-/g, '')}_${itemInfo.dataset.time.toString().padStart(2, '0')}`,
    };

    onMoveWeekItem(obj);

    ev.preventDefault();
  };

  const dateGenerate = (date, type, week, todoLists, onSelectMonth, onSelectWeek) => {
    const calendar = [];
    const today = moment(date);
    if (type === 'month') {
      const startWeek = today.clone().startOf('month').week();
      const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

      for (let week = startWeek; week <= endWeek; week++) {
        calendar.push(
          <div className="row" key={week} id={week}>
            {
              Array(7).fill(0).map((n, i) => {
                const current = today.clone().week(week).startOf('week').add(n + i, 'day');
                const isGrayed = current.format('MM') === today.format('MM') ? '' : 'grayed';
                let weekday = '';
                if (i === 0) {
                  weekday = 'sun';
                } else if (i === 6) {
                  weekday = 'sat';
                }
                return (
                  <div
                    className={`box ${weekday} ${isGrayed} t-${current.format('YYYY-MM-DD')}` }
                    id={current.format('YYYY-MM-DD')}
                    key={current.format('YYYY-MM-DD')}
                    data-date={current.format('YYYY-MM-DD')}
                    onDrop={e => dropEvent(e)}
                    onDragOver={e => dragOverEvent(e)}
                    onClick={(e) => {
                      onSelectMonth(e, 'box');
                    }}
                  >
                    <div className="text">{ current.format('D') }</div>
                    <div className="schedule-wrap" />
                  </div>
                );
              })
            }
          </div>,
        );
      }
      if (todoLists !== undefined) {
        todoMonthListsGenerate(sortTodoLists(todoLists));
      }
    } else if (type === 'week') {
      calendar.push(
        <div className="row day-row" data-week={week} key="week-wrap">
          <div className="box empty" key="box-empty" />
          {
            Array(7).fill(0).map((n, i) => {
              const current = moment().week(week).startOf('week').add(n + i, 'day');
              const isGrayed = current.format('MM') === today.format('MM') ? '' : 'grayed';
              let weekday = '';
              if (i === 0) {
                weekday = 'sun';
              } else if (i === 6) {
                weekday = 'sat';
              }
              return (
                <div
                  className={`box ${weekday} ${isGrayed}`}
                  key={current.format('YYYY-MM-DD')}
                  id={current.format('YYYY-MM-DD')}
                  data-date={current.format('YYYY-MM-DD')}
                >
                  <div className="text">{ current.format('D') }</div>
                  <div className="schedule-wrap" />
                </div>
              );
            })
          }
        </div>,
      );

      let k = 1;
      for (let time = 0; time < 24; time++) {
        calendar.push(
          <div
            className="row"
            id={`schedule-${k}-${time}`}
            key={`schedule-${k}-${time}`}
          >
            {
              Array(8).fill(0).map((n, i) => {
                let t = '';
                if (i === 0) {
                  t = moment(time, 'hh').format('LT');
                }

                return (
                  <div
                    className="box droppable"
                    key={`schedule-${time}-${i}`}
                    data-date-idx={i}
                    data-time={time}
                    onDrop={e => dropWeekEvent(e)}
                    onDragOver={e => dragOverEvent(e)}
                    onClick={(e) => {
                      onSelectWeek(e, 'box');
                    }}
                  >
                    <div className="schedule">{ t }</div>
                  </div>
                );
              })
            }
          </div>,
        );
        k++;
      }
      if (todoLists !== undefined) {
        todoWeekListsGenerate(sortTodoLists(todoLists));
      }
    }

    return calendar;
  };

  return (
    <div id="calendar-body" className={type}>
      { dayStringGenerate(type) }
      { dateGenerate(date, type, week, todoLists, onSelectMonth, onSelectWeek, onMoveWeekItem, onMoveMonthItem) }
    </div>
  );
};

export default Contents;

Contents.propTypes = {
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  week: PropTypes.number.isRequired,
  todoLists: PropTypes.object.isRequired,
  onSelectMonth: PropTypes.func.isRequired,
  onSelectWeek: PropTypes.func.isRequired,
  onMoveMonthItem: PropTypes.func.isRequired,
  onMoveWeekItem: PropTypes.func.isRequired
};
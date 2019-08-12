const express = require('express');
const router = express.Router();
const moment = require('moment');

const db = require('../db/db');
const utils = require('../utils/utils');

moment().format();
moment.locale('ko');

router.get('/', async ( req, res, next ) => {
  try {
    const result = await db.getAllTodoLists('*');

    await res.json({"code": 200, 'data': result});
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/item/:year/:month/:day/:time', async ( req, res, next ) => {
  try {
    const {year, month, day, time} = req.params;
    const key = utils.makeKey(year, month, day, time);
    const result = await db.getMonthTodoLists(key);
    await res.json({"code": 200, 'data': result});
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/month/:year/:month', async ( req, res, next ) => {
  try {
    const {year, month} = req.params;
    const key = utils.makeKey(year, month);
    const result = await db.getMonthTodoLists(key);

    await res.json({"code": 200, 'data': result});
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/week/:year/:month/:day', async ( req, res, next ) => {
  try {
    const {year, month, day} = req.params;
    const key = [];
    for (let i = 0; i < 7; i++) {
      key.push(`${ utils.makeKey(year, month, parseInt(day) + i) }*`);
    }
    const result = await db.getWeekTodoLists(key);

    await res.json({"code": 200, 'data': result});
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/add', async ( req, res, next ) => {
  try {
    const {year, month, day, time, term, memo, type} = req.body;
    if (year !== undefined && month !== undefined &&
      day !== undefined && time !== undefined &&
      term !== undefined && memo !== undefined) {
      const key = utils.makeKey(year, month, day, time);
      const endTime = utils.makeKey(year, month, day, parseInt(time, 10) + parseInt(term, 10));

      const isKey = await db.isKey(`${ key.split('_')[0] }*`, key, endTime);
      if (!isKey) {
        const {code, msg} = await db.setTodoList(key, {term: term, memo: memo});
        //await res.json({code: code, msg: msg});
        if (code === 200) {
          let key;
          let result;
          if (type === 'week') {
            key = [];
            const weekDay = moment(`${ year }-${ month }-${ day }`).startOf('week').date();
            for (let i = 0; i < 7; i++) {
              key.push(`${ utils.makeKey(year, month, weekDay + i) }*`);
            }
            result = await db.getWeekTodoLists(key);
          } else {
            key = `${ utils.makeKey(year, month) }*`;
            result = await db.getMonthTodoLists(key);
          }

          await res.json({"code": 200, 'data': result});
        } else {
          await res.json({code: code, msg: msg});
        }
      } else {
        await res.json({code: 400, msg: "해당 시간에 다른 스케쥴이 있습니다."});
      }
    } else {
      await res.json({code: 400, msg: "인자값이 모자랍니다."});
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/change', async ( req, res, next ) => {
  try {
    const {year, month, day, time, term, memo, origin_date, type} = req.body;
    if (year !== undefined && month !== undefined &&
      day !== undefined && time !== undefined &&
      term !== undefined && memo !== undefined) {

      const key = utils.makeKey(year, month, day, time);
      const endTime = utils.makeKey(year, month, day, parseInt(time) + parseInt(term));
      const isKey = await db.isKey(`${ key.split('_')[0] }*`, key, endTime, origin_date);

      if (!isKey) {
        await db.delToodolist(origin_date);
        const {code, msg} = await db.setTodoList(key, {
          term: term,
          memo: memo
        });
        if (code === 200) {
          let key;
          let result;
          if (type === 'week') {
            key = [];
            const weekDay = moment(`${ year }-${ month }-${ day }`).startOf('week').date();
            for (let i = 0; i < 7; i++) {
              key.push(`${ utils.makeKey(year, month, (weekDay + i)) }*`);
            }
            result = await db.getWeekTodoLists(key);
          } else {
            key = `${ utils.makeKey(year, month) }*`;
            result = await db.getMonthTodoLists(key);
          }

          await res.json({"code": 200, 'data': result});
        } else {
          await res.json({code: code, msg: msg});
        }
      } else {
        await res.json({code: 400, msg: "해당 시간에 다른 스케쥴이 있습니다."});
      }
    } else {
      await res.json({code: 400, msg: "인자값이 모자랍니다."})
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/delete/:year/:month/:day/:time', async ( req, res, next ) => {
  try {
    const {year, month, day, time} = req.params;
    if (year !== undefined && month !== undefined &&
      day !== undefined && time !== undefined) {
      const key = utils.makeKey(year, month, day, time);
      const result = await db.delToodolist(key);
      await res.json({code: 200, msg: result});
    } else {
      await res.json({code: 400, msg: "인자값이 모자랍니다."})
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});


module.exports = router;
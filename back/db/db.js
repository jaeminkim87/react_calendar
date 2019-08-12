require("@babel/polyfill");
const {promisify} = require('util');
const redis = require('redis');
const client = redis.createClient({
  host: '127.0.0.1',
  port: '6379',
  db: 0
});

const existAsync = promisify(client.exists).bind(client);
const scanAsync = promisify(client.scan).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);
const delAsync = promisify(client.del).bind(client);
const keysAsync = promisify(client.keys).bind(client);

client.on('error', (err) => {
  console.error(err);
});

const isKey = async (pattern, start, end, origin_date = null) => {
  try {
    const result = await keysAsync(pattern);
    const found = result.find((element) => {
      return element > start && element < end;
    });

    if (origin_date !== null) {
      if (found !== undefined && found === origin_date) {
        return false;
      } else if (found !== undefined && found !== origin_date) {
        return true;
      } else if (found === undefined) {
        return false;
      }
    } else {
      return found !== undefined;
    }

  } catch (e) {
    return true;
  }
};

const setTodoList = async (key, data_obj) => {
  try {
    const data_array = [];

    if (existAsync(key) > 0) return {code: 400, msg: "해당 시간에 등록된 스케쥴이 있습니다."};

    Object.keys(data_obj).map((key) => {
      data_array.push(key);
      data_array.push(data_obj[key]);
      return data_array;
    });
    const result = await hmsetAsync(key, ...data_array);
    if (result) return {code: 200, msg: "저장 완료"};
    return {code: 500, msg: "저장이 되지 않았습니다."}
  } catch (e) {
    return e;
  }
};

const getAllTodoLists = async (pattern) => {
  try {
    let results;
    let allData = {};
    if (Array.isArray(pattern)) {
      for (let i = 0; i < pattern.length; i++) {
        results = await scanAsync(0, 'MATCH', pattern[i]);
        for (let result of results[1]) {
          allData[result] = await hgetallAsync(result);
        }
      }
    } else {
      results = await scanAsync(0, 'MATCH', pattern);
      for (let result of results[1]) {
        allData[result] = await hgetallAsync(result);
      }
    }
    return allData;
  } catch (e) {
    return e;
  }
};


const getMonthTodoLists = async (key) => {
  try {
    return await getAllTodoLists(key + '*');
  } catch (e) {
    return e;
  }
};

/**
 *
 * @param key Array[string]
 * @returns {Promise<{}|*|*>}
 */
const getWeekTodoLists = async (key) => {
  try {
    return await getAllTodoLists(key);
  } catch (e) {
    return e;
  }
};

const delToodolist = async (key) => {
  try {
    return await delAsync(key)
  } catch (e) {
    return e;
  }
};

module.exports = {
  getMonthTodoLists: getMonthTodoLists,
  getWeekTodoLists: getWeekTodoLists,
  setTodoList: setTodoList,
  getAllTodoLists: getAllTodoLists,
  delToodolist: delToodolist,
  isKey: isKey
};


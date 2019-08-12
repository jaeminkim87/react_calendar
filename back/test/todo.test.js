const routerUnderTest = require('../routes/todos');
// const httptest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const sinon = require('sinon');
const request = require('request');

const app = express();
app.use('/', routerUnderTest);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const base = 'http://localhost:8080';

describe("API TEST", () => {
  describe("POST", () => {
    it("/POST Add", async ( done ) => {
      const options = {
        body: {
          "year": '2019',
          "month": '08',
          "day": '13',
          "time": '4',
          "term": '3',
          "memo": '안녕하세요'
        },
        json: true,
        url: `${ base }/api/todos/add`
      };
      await request.post(options, ( err, res, req ) => {
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toHaveProperty("20190813_04");
        done();
      });
    });
    it("/POST change", async ( done ) => {
      const options = {
        body: {
          "year": '2019',
          "month": '08',
          "day": '13',
          "time": '5',
          "term": '3',
          "memo": '안녕하세요'
        },
        json: true,
        url: `${ base }/api/todos/change`
      };
      await request.post(options, ( err, res, req ) => {
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toHaveProperty("20190813_05");
        done();
      });
    });
  });

  describe("GET", () => {
    it("/GET One Todo", async ( done ) => {
      await request.get(`${ base }/api/todos/item/2019/08/13/05`, ( err, res, req ) => {
        const body = JSON.parse(res.body);
        expect(body.code).toEqual(200);
        expect(Object.keys(body.data).length).toEqual(1);
        expect(body.data).toHaveProperty("20190813_05");
        done();
      });
    });
    it("/GET Month Todos", async ( done ) => {
      await request.get(`${ base }/api/todos/month/2019/08/`, ( err, res, req ) => {
        const body = JSON.parse(res.body);
        expect(body.code).toEqual(200);
        expect(body.data).toHaveProperty("20190813_05");
        done();
      });
    });

    it("/GET Week Todos", async ( done ) => {
      await request.get(`${ base }/api/todos/week/2019/08/13`, ( err, res, req ) => {
        const body = JSON.parse(res.body);
        expect(body.code).toEqual(200);
        expect(body.data).toHaveProperty("20190813_05");
        done();
      });
    });
  });

  describe("DELETE", () => {
    it("/DELETE", async ( done ) => {
      await request.delete(`${ base }/api/todos/delete/2019/08/13/05`, ( err, res, req ) => {
        const body = JSON.parse(res.body);
        expect(body.code).toEqual(200);
        expect(body.msg).toEqual(1);
        done();
      });
    });
  });
});

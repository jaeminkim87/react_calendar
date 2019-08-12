const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const todoAPIRouter = require('./routes/todos');
const methodOverride = require('method-override');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Server OK');
});

app.use(methodOverride('_method'));
app.use(express.json());
app.use('/api/todos', todoAPIRouter);

app.listen(8080, () => {
  console.log('server is running on 8080')
});


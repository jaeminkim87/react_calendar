const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const methodOverride = require('method-override');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('/', ( req, res ) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(methodOverride('_method'));
app.use(express.json());

app.listen(7777, () => {
  console.log('server is running on 7777');
});


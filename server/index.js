require('dotenv').config();
const express = require('express');
const cors = require('cors')
const sequelize = require('./database/client');
const path = require('path');
const userRouter = require('./routes/userRouter');
const authenticationRouter = require('./routes/authenticationRouter');
const app = express();


// -----middlewares----
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// -----routes----
app.use('/user', userRouter);
app.use('/auth', authenticationRouter);
app.use('/', (req, res) =>{
  res.send('Welcome to Resister User API');
});

// -----server-----
const PORT = process.env.PORT || 3000;

const authentication = async() =>{
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

app.listen(PORT, authentication);



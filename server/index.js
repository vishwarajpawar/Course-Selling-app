const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const app = express();

const validateToken = require('./authentication');
const generateToken = require('./TokenGeneration');

app.use(cors());
app.use(express.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

mongoose.connect('mongodb+srv://godvsp:godvsp%401234@cluster0.1y8bi1x.mongodb.net/',{useNewUrlParser: true,  useUnifiedTopology: true, dbName: 'SellCourse'});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

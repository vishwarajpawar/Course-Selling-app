const  express  =  require('express');

const validateToken = require('../authentication');
const generateToken = require('../TokenGeneration');

const {User, Course} = require('../db');

const router = express.Router();

// User routes
router.post('/signup', async (req, res) => {
  // logic to sign up user
  const {username, password} = req.body;
  const user = await User.findOne({username, password});
  if(user){
    res.status(401).json({message:'User already exists'});
  }
  else{
    const newUser = new User(req.body);
    await newUser.save();
    const token = generateToken(newUser);
    res.status(201).json({message:'User Created successfully', token})
  }
});

router.post('/login', async (req, res) => {
  // logic to log in user
  const user = await User.findOne({username: req.headers.username, password: req.headers.password});
  if(user){
    const token = generateToken(user);
    res.status(200).json({message:'Logged in successfully', token});
  }
  else{
    res.status(401).json({message:'Invalid username or password'});
  }

});

router.get('/courses', validateToken, async (req, res) => {
  // logic to list all courses
  const course = await Course.find({published: true});
  res.status(200).json({course})
});

router.post('/courses/:courseId',validateToken ,async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId);
  if(course){
    const user = await User.findOne({username: req.user.username});
    if(user){
      user.purchasedCourses.push(course);
      await user.save();
      res.status(201).json({message:'Course purchased successfully'});
    }
    else{
      res.sendStatus(403);
    }
  }else{
    res.sendStatus(404).json({message:'Course not found'});
  }
});

router.get('/purchasedCourses', validateToken, async (req, res) => {
  // logic to view purchased courses[]
  const user = await User.findOne({username: req.user.username}).populate('purchasedCourses');
  if(user){
    res.status(200).json({purchasedCourses: user.purchasedCourses || []});
  }else{
    res.status(403).json({message:'User not found'});
  }
});

module.exports = router
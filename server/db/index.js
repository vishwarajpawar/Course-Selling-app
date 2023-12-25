const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {type: String},
  password:String,
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

const adminSchema = new mongoose.Schema({
  username:String,
  password:String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Adimn',adminSchema);
const Course = mongoose.model('Course',courseSchema);

module.export = {
  User,
  Admin,
  Course
}

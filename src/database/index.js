// Require Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/functionjunction', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Schema
const userSchema = new mongoose.Schema({
  usernme: String,
  age: Number,
  wins: Number,
});

// Create a Model
const User = mongoose.model('User', userSchema);

// Create a Document
const user = new User({
  name: 'John',
  age: 25,
  wins: 5,
});

// Save the Document
user.save()
  .then(() => console.log('User saved!'))
  .catch((err) => console.log(err));

require('dotenv').config();
const jwt = require('jsonwebtoken');



const secret = process.env.secret;

function setUser(user) {
  return jwt.sign(
    {
      "_id": user._id, 
      "email": user.email,
      "name": user.name,
      "age": user.age, 
      "gender": user.gender,
      "location": user.location,
     "interests": user.interests.map(interest => interest.toString())
    },
    secret
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }


}

module.exports = {
  setUser,
  getUser,
};

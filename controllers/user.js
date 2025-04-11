const fs = require('fs');
const path = require('path');
const User = require("../models/user_model");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name,age,gender, location,interests, email, password } = req.body;

  let user = await User.findOne({ email });
  if(user){
    return res.status(400).json({ error: "User already exists" });
  } 
  user = await User.create({
    name,
    age,
    gender,
    location,
    interests,
    email,
    password
  });
  const jwtToken = setUser(user);
  return res.status(200).json({ "jwtToken": jwtToken});
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password});
  if(user){
    const jwtToken = setUser(user);
    return res.status(200).json({ "jwtToken": jwtToken});
  }
  return res.status(400).json({ "error": "Incorrect Credentials"});
}

function handleDatingData(req, res) {
  const filePath = path.join("./data", 'data.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Server Error: Unable to read the file.');
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(400).send('Invalid JSON format in file.');
    }
  });
}

function handleFilterUser(req, res) {
  const filePath = path.join("./data", 'data.json');

  // Read the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Server Error: Unable to read the file.');
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Extract query parameters from the request
      const { interests, location, age, gender } = req.query;
      const interestArray = interests ? interests.split(',') : [];
      const finalIntrestArray = interestArray.join(',');
      const finalIntrestArray2 = JSON.parse(finalIntrestArray);
      // Filter users based on the provided criteria
      const filteredUsers = jsonData.filter(user => {

        const matchesInterest =
          finalIntrestArray2.some(interestItem => user.interests.includes(interestItem));
        const matchesLocation = user.location.includes(location);
        const matchesAge = user.age <= parseInt(age, 10) + 5 && user.age >= parseInt(age, 10) - 5;
        const matchesGender = user.gender.toLowerCase() !== gender.toLowerCase();


        return matchesLocation && matchesAge && matchesGender && matchesInterest;
      });

      // Send the filtered users as a JSON response
      res.json({ users: filteredUsers });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(400).send('Invalid JSON format in file.');
    }
  });
}

async function handleUserFriends(req, res) {
  try {
      const { gender } = req.query; 
      if (!gender || !["male", "female"].includes(gender.toLowerCase())) {
          return res.status(400).json({ error: "Invalid gender. Use 'male' or 'female'." });
      }

      const oppositeGender = gender.toLowerCase() === "male" ? "Female" : "Male";

      const users = await User.find({ gender: oppositeGender }, "name email age gender interests location"); 

      return res.status(200).json(users);
  } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
  }
}




module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleDatingData,
  handleFilterUser,
  handleUserFriends
};

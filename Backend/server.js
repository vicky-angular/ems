const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
// mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/ems")
 .then(() => {
    console.log("mongodb connection successfully");
  })
 .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  const userSchema = new mongoose.Schema({
    firstName:{
      type: String
    },

    lastName: {
      type: String,
    },
    age: {
      type: Number,
    },
    dateOfJoining: {
      type: Date,
    },
    title: {
      type: String
    },
    department: {
      type: String
    },
    employeeType: {
      type: String
    },
    currentStatus: {
      type: Boolean,
    }
  },
{
timestamps:true
});
  const User = mongoose.model("User", userSchema);
  app.post("/createuser", async(req,res) => {
     try{
     const bodyData = req.body;
     const user = new User(bodyData);
     console.log('BACKEND USER--1', user)
     const userData = await user.save();
     res.status(201).send(userData);
     }catch(error){
     res.status(400).send(error);
     }
  })

app.get("/", (req, res) => {
  res.send("from get route");
});

// GET endpoint to retrieve all employees
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log('THE FETCH USER--', users)
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`server running on port... ${PORT}`);
});
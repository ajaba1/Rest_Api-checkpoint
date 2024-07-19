import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";

const app = express();
const port = 3000;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ajabafrancis:qBFxL8CdSpxEaATV@cluster0.czdnofv.mongodb.net/Rest-Api?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongoDB connected successfully");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Rout definition

// Rout for getting all user

app.get("/user", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (error) {
    console.log(error);
    res.send("an error occured");
  }
});

// route for adding a user

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // create a user using the user Model
    const creatUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    // send the created as a response back to the client
    res.send(creatUser);
  } catch (error) {
    console.log(error);
    res.send("an error occoured");
  }
});

// route fot updting a user by id
app.put("/update-user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: name },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.send("error occured");
  }
});

// route for deleting a user by id
app.delete("/delete-user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send(deletedUser);
  } catch (error) {
    res.send("error occured");
  }
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
connectDB();

import express from "express";
import env from "dotenv";
import cors from 'cors'

const app = express();

env.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));



app.post("/", (req,res) =>{
  const {generateData,range} = req.body
  if (generateData.length <= 0) {
    return res
      .status(201)
      .json({ message: "please choose atleast one option" });
  }
  const options = {
    uppecase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    LowerCase: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbols: "!@#$%^&*()"
  };

  let allCharacters = "";

  generateData.forEach(option => {
    if (options[option]) {
      allCharacters += options[option];
    }
  });
  

  let password = "";
  for (let i = 0; i < range; i++) {
    password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
  }
  res.status(200).json({password,message:'password generated'})
});


app.listen(process.env.PORT, () => {
  console.log("server is running");
});

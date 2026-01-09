const express = require('express')
const mongoose = require('mongoose')
const user = require('./model')
const bcrypt = require('bcrypt')

const app = express();
app.use(express.json())
mongoose.connect('mongodb+srv://mohammadshameema5_db_user:Shameema5353@cluster0.oqlnd7i.mongodb.net/')
  .then(() => console.log('connected to db...'))
  .catch(err => console.log(err));

  app.post('/signup', async (req,res) =>{
    const {username} = req.body
    const {email} = req.body
    const {password} =req.body
  try{
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password,salt)

    const newUser =new user({username, email, password:hashed_password});
    await newUser.save();
    return res.status(200).json("User signup successfully"); 
    } 
    catch (err){
        console.log(err.message)
    }
})
app.post("/login", async (req,res)=> {
  try{
  const {email} = req.body
  const {password} = req.body
   const fonunduser =await user.findOne({ email });
   await bcrypt.compare(password,fonunduser.password)
   return res.json({
       message: "Login successful",
           user: {
            id: fonunduser._id,
            username: fonunduser.username,
            email: fonunduser.email

           }

   })
  }
  catch (err){
      console.log(err.message)
  }
})
 
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));

    
  

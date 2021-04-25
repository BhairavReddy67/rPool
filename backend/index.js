const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const cors = require('cors')


const app = express()

app.use(cors())

app.use(express.json())


const connect = () => {
   return mongoose.connect('mongodb://localhost:27017/myRide',{
        useCreateIndex : true,
        useFindAndModify : true,
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
}

const userSchema = new mongoose.Schema({
    userName  : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    createRide : {
        type : Boolean,
        required : true,
        default : false
    },
    joinRide : {
        type : Boolean,
        required : true,
        default : false
    }
})

const User = mongoose.model('user',userSchema)


const driveSchema = new mongoose.Schema({
  living_from  : {
      type : String,
      required : true
  },
  going_to : {
      type : String,
      required : true
  },
  date : {
      type : String,
      required : true
  },
  time : {
      type : String,
      required : true
  },
  price : {
      type : String,
      required : true
  },
  seating : {
    type : String,
    required : true
  },
  riders : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required : true
  }]

})

const Drive = mongoose.model('drive',driveSchema)



//Authentication


const registerUser = async (req, res) => {
    const mobileExists = await User.findOne({ mobile: req.body.mobile });
    if (mobileExists) {
      return res.status(400).json("Mobile Number is already registered");
    }
  
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
  
    const user = new User({
      userName: req.body.userName,
      mobile: req.body.mobile,
      password: hashedPassword,
    });
    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
  const loginUser = async (req, res) => {
    const user = await User.findOne({ mobile: req.body.mobile });
    if (!user) {
      return res.status(400).send("Mobile Number is not registered");
    }
  
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).send("Invalid Password");
    }
    res.send("logged in");
  };
  




//API's


app.post('/register', registerUser)

app.post('/login',loginUser)

app.get('/users', async(req,res) => {
    const users = await User.find({}).lean().exec()
    res.status(200).json({data:users})
})

app.delete('/user/:id', async(req,res) => {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec()
    res.status(200).json({data:user})
})

app.patch('/user/:id', async(req,res) => {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
    res.status(201).json({data:user})
})


app.post('/drive',async(req,res)=>{
  const drive = await Drive.create(req.body)
  res.status(201).json({data : drive})
})


app.get('/drives',async(req,res)=>{
  const drives = await Drive.find({}).populate('riders').lean().exec()
  res.status(200).json({data : drives})
})


app.patch('/drive/:id',async(req,res)=>{
  const drive = await Drive.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.status(201).json({data : drive})
})

app.delete('/drives/:id',async(req,res)=>{
  const drive = await Drive.findByIdAndDelete(req.params.id).lean().exec()
  res.status(200).json({data : drive})
})

app.get('/drive/:id',async(req,res)=>{
  const drives = await Drive.findById(req.params.id).populate('riders').lean().exec()
  res.status(200).json({data : drives})
})




const start = async () => {
    await connect()

    app.listen(8071, () => {
        console.log(`App listening at http://localhost:8071`)
      })
}

start()



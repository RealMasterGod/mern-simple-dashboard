const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ClientRoute = require('./routes/clients')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
require('dotenv').config()

main().then(() => console.log('Connected to db.')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

app.use("/uploads", express.static(path.join(__dirname,"public/uploads")))

app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,"public/uploads")
  },
  filename: (req,file,cb) => {
    cb(null,req.body.name)
  }
})

const upload = multer({storage})
app.post('/api/upload',upload.single("file"), (req,res) => {
  try {
    return res.status(200).json("file uploaded successfully.")
  } catch (err) {

  }
})


app.use('/api/clients',ClientRoute)


app.listen(5000,() => {
    console.log('server running on port 5000...')
})
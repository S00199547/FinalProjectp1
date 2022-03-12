express = require('express');
mongoose = require('mongoose');
cors=require('cors');
const app = express();
const port = 3000;
const Joi= require('joi')
const cookieParser=require('cookie-parser')
const https=require('https')
const fs=require('fs');

const devices= require('./routes/devices')
const users=require('./routes/users');
const auth=require('./routes/auth');
const home = require('./routes/home')
const corsOptions = {
  origin:'https://localhost:4200',
  credentials:true
}

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors(corsOptions));
app.use(cookieParser());


app.get('/',(req,res )=> res.send ('Electronics Devices Shop'));


//Routes
app.use('/devices',devices);
app.use('/users',users)
app.use('/auth',auth);
app.use('/home',home);




//Connection with mongoodb

const connectionString = 'mongodb://127.0.0.1:27017/ElectronicsDevices'

mongoose.connect(connectionString, {

  "useNewUrlParser": true,

  "useUnifiedTopology": true

}).
catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {

  console.log('DB connected')

});






const serverOptions={
  key:fs.readFileSync("ssl/local.key"),
  cert:fs.readFileSync("ssl/local.cert")
};

https.createServer(serverOptions,app).listen(8080,()=> console.log(`listening on 8080, do not forget the https`));


//listen port


app.listen(port,() => console.log(`Example app listening on port ${port}!`))
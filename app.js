let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let emailRouter = require('./routes/emails');
let Post = require('./models/posts').Post;
let adminsRouter = require('./routes/admins');
let usersRouter = require('./routes/users');
let auth = require('./controllers/auth');
let userAuth = require('./controllers/userAuth');


app.set('view engine', 'ejs');

//DB config
const db = require('./config/key').MongoURI;

//Connect to Mongodb
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
    .then( ()=>console.log('MongoDB connected....'))
    .catch(err => console.log(err));

app.use(express.json());

// For Image Files
let imageStorage = multer.diskStorage({
    destination : (req, file, cb) => cb(null,'public/images'),
    filename : (req, file, cb) => cb(null, file.originalname)
});

app.use(multer({ storage : imageStorage}).single('imageFile'));
app.use(express.static('public'));

app.use('/posts',postsRouter);
app.use('/callback-requests',callbackRequestsRouter );
app.use('/emails',emailRouter );
app.use('/admins',adminsRouter);
app.use('/users', usersRouter);
app.use(cookieParser());


app.get('/sight', async (req,res) =>{
    let id = req.query.id;
    let post = await Post.findOne({ id : id});
    res.render('sight', {
        title : post.title,
        imageURL :post.imageURL,
        date : post.date,
        text : post.text
    })
});


app.get('/admin', (req,res)=> {
    let token = req.cookies['auth_token'];
  
    if(token && auth.checkToken(token)){
        res.render('admin');
    }else{
       res.redirect('/login');
    }
   
});

app.get('/login', (req,res) =>{
    res.render('login');
});


app.get('/hotel', (req, res) =>{
    let userToken = req.cookies['user_auth'];
    if( userToken && userAuth.checkUserToken(userToken)){
        res.render('hotel');
    }else{
        res.redirect('/userlogin');
    }
   
})

app.get('/userlogin', (req, res)=>{
    res.render('userlogin');
});

app.get('/hotel/cox-hotel', (req, res)=>{
    res.render('cox-hotel');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
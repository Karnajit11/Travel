let Post = require('../models/posts').Post;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();




router.get('/',async (req,res) =>{
    let posts = await Post.find();
    res.send(posts);
});

router.get('/:id',async (req,res) =>{
    let id = req.params.id;
    let post = await Post.findOne({ id : id });
    res.send(post);
});

router.post('/',async (req,res) =>{
    let reqBody = req.body;
    let imgPath;

    if(reqBody.imageURL){
        imgPath = reqBody.imageURL;
    }else{

        imgPath = '/images/' + req.file.filename;
        //imgPath =  '/images/' + req.file.originalname;

       //imgPath = req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length);    
    }

    let nwePost = new Post({
        id : uniqid(),
        title : reqBody.title,
        date : new Date(),
        description : reqBody.description,
        text : reqBody.text,
        district : reqBody.district,
        imageURL : imgPath
    })
    
    await nwePost.save();
    res.send('Created');
});

router.delete('/:id', async (req,res)=>{
    let id = req.params.id;
    await Post.deleteOne({ id:id });
    res.send('Deleted');
});

router.put('/:id', async (req, res)=>{
    let id = req.params.id;
    await Post.updateOne({ id:id}, req.body);
    res.send('Updated..');
});


module.exports = router;
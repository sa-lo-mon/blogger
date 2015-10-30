var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoAccessLayer = require('./www/js/mongoAccessLayer.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/www'));

app.get('/api/getPosts', function (req, res) {

    //tell mongo to ignore these fields
    //in order to ease data transport
    var ignoreFields = {email: 0, content: 0, creationDate: 0};

    //get latest 10 posts from db
    mongoAccessLayer.getTopNDocs('posts', {}, ignoreFields, 10, function (err, data) {
        if (err) {
            res.json({success: false, data: null, message: err.message});
        }
        else {
            res.json({success: true, data: data, message: null});
        }
    });
});

app.get('/api/getPostDetails/:postId', function (req, res) {

    if (!req.params.postId) {
        res.status(403).send('Invalid Request');
        return;
    }
    var postId = req.params.postId;
    var objectId = mongoAccessLayer.getObjectID(postId)
    var query = {_id: objectId};

    //get latest 10 posts from db
    mongoAccessLayer.getCollection('posts', query, function (err, data) {
        if (err) {
            res.json({success: false, data: null, message: err.message});
        }
        else {
            res.json({success: true, data: data, message: null});
        }
    });

});

app.post('/api/insertPost', function (req, res) {

    if (!req.body.post) {
        res.status(403).send('Invalid Request');
        return;
    }

    var post = req.body.post;

    //ensure that a post has email, title and content
    if (!post.email || !post.title || !post.content) {
        res.json({success: false, data: null, message: 'invalid fields value'});
        return;
    }

    post.creationDate = new Date();

    //insert post
    mongoAccessLayer.insertDocument('posts', post, function (err, data) {
        if (err) {
            res.json({success: false, data: null, message: err.message});
        }
        else {
            res.json({success: true, data: data, message: null});
        }
    });
});

var port = process.env.PORT || 8000;
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});

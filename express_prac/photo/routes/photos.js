var photos = [];
photos.push({
  name: 'Node.js Logo',
  path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
  name: 'Ryan  Speaking',
  path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

var Photo = require('../models/Photos');
var path  = require('path');
var fs = require('fs');
var join = path.join;

exports.list = function (req,res,next) {
  Photo.find({},function(err,photos) {
    if(err) return next(err);
    res.render('photos',{
      title: 'Photos',
      photos: photos
    });
  });
};

exports.form = function (req,res) {
  res.render('photos/upload',{
    title: 'Photo upload'
  });
};

exports.submit = function(dir) {
  return function(req,res,next) {
    console.log(req.body);
    var img = req.body.files.photo.image;
    var name = req.body.photo.name || img.name;
    var path = join(dir,img.name);

    fs.rename(img.path,function(err) {
      if(err) return next(err);
      Photo.create({
        name: name,
        path: img.name
      },function(err) {
        if(err) return next(err);
        res.redirect('/');
      });
    });
  };
};

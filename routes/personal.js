//const User = require('../models/user');
const express = require('express');
const router = express.Router();
const Picture = require('../models/picture.js');
const User = require('../models/user');
const uploadCloud = require('../config/cloudinary.js')

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/auth/login');
});


router.get('/profile', function (req, res, next) {
  let query = {
    user: req.session.currentUser._id
  }
  let user1;
  User.findById(req.session.currentUser._id)
    .then(user => user1 = user)
  Picture.find(query)
    .then(pictures => res.render('personal/profile', {
      pictures,
      user1
    }))
    .catch(error => console.log(error));
});


router.get('/edit', function (req, res, next) {
  let query = {
    user: req.session.currentUser._id
  }
  let user1;
  User.findById(req.session.currentUser._id)
    .then(user => user1 = user)
  Picture.find(query)
    .then(pictures => res.render('personal/edit', {
      pictures,
      user1
    }))
    .catch(error => console.log(error));
});

router.post('/:id/delete', async (req, res, next) => {
  let query = {
    user: req.session.currentUser._id
  }
  let user1;
  await Picture.findByIdAndDelete(req.params.id)
  await User.findById(req.session.currentUser._id)
    .then(user => user1 = user)
  Picture.find(query)
    .then(pictures => res.render('personal/edit', {
      pictures,
      user1
    }))
    .catch(error => {
      console.log('Error while deleting', error);
    })
})


router.post('/:id/edit', uploadCloud.single('photo'), (req, res, next) => {
  let imgPath;
  let imgName;
  const {
    name,
    city,
    website
  } = req.body;
  if(req.file !== undefined) {
    imgPath = req.file.url;
    imgName = req.file.originalname;
  } else {
    imgPath = req.session.currentUser.imgPath;
    imgName = req.session.currentUser.imgName;
  }
  User.updateOne({
      _id: req.params.id
    }, {
      $set: {
        name,
        city,
        website,
        imgPath,
        imgName
      }
    })
    .then(() => {
      res.redirect('/personal/profile');
    })
    .catch(error => {
      console.log('Error while editing', error);
    })
})

module.exports = router;
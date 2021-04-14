const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   try {
//     // Get all users, sorted by name
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     // Serialize user data so templates can read it
//     const users = userData.map((project) => project.get({ plain: true }));

//     // Pass serialized data into Handlebars.js template
//     res.render('homepage', { users });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/', async (req, res) => {
  try {
    // Get all posts, sorted by title
    const postData = await Post.findAll({
      order: [['title', 'ASC']],
    });

    // Serialize post data so templates can read it
    const posts = postData.map((project) => project.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// DASHBOARD
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get all posts by user, sorted by title
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [['title', 'ASC']],
    });

    // Serialize post data so templates can read it
    const posts = postData.map((project) => project.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

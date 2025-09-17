const express = require('express');
const router = express.Router();
const filmsController = require('../controllers/filmsController');

router.get('/', filmsController.list);
router.get('/:id', filmsController.details);

module.exports = router;

// const overviewController = require('../controllers/overview.controller');

// const logger = require('../util/logger.js');



// router routes defintion, where you put the function to be excecuted behind the comma (Like, "movieController.listMovies")
router.get('/', filmsController.list);
router.get('/:id', filmsController.details);
router.get('/search', filmsController.search);







// Routes
// router.get("/hello", (req, res) => {
//   logger.info("GET request on /hello");
//   res.send("<h1>Hello World</h1>");
// });

// router.get("/hel", (req, res) => {
//   logger.info('GET request on "/hel"');
//   res.send("Welkom op de homepage");
// });

// Export the router (no listen here!)
module.exports = router;
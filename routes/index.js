var express = require('express');
var router = express.Router();
let main = require("../controllers/main")
let user = require("../controllers/user")
const jsonParser = express.json();
/* GET home page. */
router.get('/', main.getMain);

router.post('/user', user.postUser);
router.post('/user_w', user.postUserWithWorker);
router.post('/user_a', user.postUserAsync);

router.get("/api/users", user.getUsers);
router.get("/api/users/:id", user.getUserById);


module.exports = router;
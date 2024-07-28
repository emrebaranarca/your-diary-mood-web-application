const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validateJWT = require('../middlewares/validateJWT');

router.post('/upload-profile-picture', validateJWT, (req, res) => userController.uploadProfilePicture(req, res));
router.get('/get-user', validateJWT, (req, res) => userController.getUser(req, res));

module.exports = router;
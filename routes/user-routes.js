const router = require('express').Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const uploadController = require('../controllers/upload');
const multer = require('multer');
const { find } = require('../collections/User');
const UserModel = require('../collections/User');
const upload = multer();

router.post('/register', authController.signUp);
router.post('/login', authController.SignIn);
router.get('/logout', authController.logout);


router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

//image
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;

const TitleController = require(path.join(__dirname, '../controllers/title.controller'))

const express = require('express')

const router = express.Router();

router.post('/create', TitleController.createTitle);
router.get('/:id', TitleController.getTitleById);
router.get('/', TitleController.getAllTitles);
router.delete('/:id', TitleController.deleteTitle);
router.put('/:id', TitleController.updateTitle);

module.exports = router;
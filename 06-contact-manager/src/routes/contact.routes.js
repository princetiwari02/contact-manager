const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getContacts, getContactById, createContact, updateContact, deleteContact, toggleFavorite, getGroups } = require('../controllers/contact.controller');

router.use(auth);
router.get('/groups', getGroups);
router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.patch('/:id/favorite', toggleFavorite);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
    getDevelopers,
    getDeveloperProfile,
    addDeveloperProfile,
    searchDeveloperProfile,
    deleteDeveloperProfile,
} = require('../controllers/devProfiles');

router.route('/').get(getDevelopers).post(addDeveloperProfile);
router.route('/:id').get(getDeveloperProfile).delete(deleteDeveloperProfile);
router.route('/search/:id').get(searchDeveloperProfile);

module.exports = router;
const router = require('express').Router();
const ManageProfileService = {};

router.post('/', (req, res) => res.status(201).end());
router.put('/', (req, res) => res.status(200).end());
router.delete('/', (req, res) => res.status(200).end());
router.get('/', (req, res) => res.status(200).end());


module.exports = router;
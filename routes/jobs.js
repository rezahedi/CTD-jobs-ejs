const express = require('express')
const router = express.Router()
const {
  allJobs,
  addJob,
  showAddJobForm,
  showEditJobForm,
  updateJob,
  deleteJob,
} = require('../controllers/jobs')

router.route('/').get(allJobs).post(addJob)
router.route('/new').get(showAddJobForm)
router.route('/edit/:id').get(showEditJobForm)
router.route('/update/:id').post(updateJob)
router.route('/delete/:id').post(deleteJob)

module.exports = router
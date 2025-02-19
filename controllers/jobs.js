const Expense = require('../models/Expense')

const allJobs = async (req, res, next) => {
  const expenses = await Expense
    .find({ userId: req.user.id })
    .populate('userId', 'name')
    .sort('createdAt')
  // TODO: Fetch limited data from mongodb and paginate
  // TODO: Make table sortable (Search feature)

  return res.render('jobs/list', { expenses })
}

const showAddJobForm = async (req, res, next) => {
  return res.render('jobs/newJobForm')
}

const addJob = async (req, res, next) => {
  //TODO: Insert job into db
}

const showEditJobForm = async (req, res, next) => {
  return res.render('jobs/editJobForm')
}

const updateJob = async (req, res, next) => {
  //TODO: Update job in db
}

const deleteJob = async (req, res, next) => {
  //TODO: Delete job from db
}

module.exports = {
  allJobs,
  addJob,
  showAddJobForm,
  showEditJobForm,
  updateJob,
  deleteJob,
}
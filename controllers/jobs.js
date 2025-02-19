const allJobs = async (req, res, next) => {
  return res.render('jobs/list')
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
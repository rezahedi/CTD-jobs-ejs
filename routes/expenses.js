const express = require('express')
const router = express.Router()
const {
  allExpenses,
  addExpense,
  showAddExpenseForm,
  showEditExpenseForm,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenses')

router.route('/').get(allExpenses).post(addExpense)
router.route('/new').get(showAddExpenseForm)
router.route('/edit/:id').get(showEditExpenseForm)
router.route('/update/:id').post(updateExpense)
router.route('/delete/:id').post(deleteExpense)

module.exports = router
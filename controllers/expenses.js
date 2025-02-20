const Expense = require('../models/Expense')

// TODO: Create categories schema model
const CATS = ['Groceries', 'Rent', 'Entertainment', 'Transportation', 'Health', 'Utilities', 'Bills', 'Subscriptions', 'Other']

// TODO: Handling Errors

const allExpenses = async (req, res, next) => {
  const expenses = await Expense
    .find({ userId: req.user.id })
    .populate('userId', 'name')
    .sort('createdAt')
  // TODO: Fetch limited data from mongodb and paginate
  // TODO: Make table sortable (Search feature)

  return res.render('expenses/list', { expenses })
}

const showAddExpenseForm = async (req, res, next) => {
  const categories = CATS
  return res.render('expenses/expenseForm', {
    expense: null,
    categories,
    page: {
      title: 'Create New Expense',
      formAction: `/expenses`
    }
  })
}

const addExpense = async (req, res, next) => {
  const { title, amount, description, category } = req.body

  const userId = req.user.id

  //TODO: Insert job into db
  const expense = await Expense.create(
    {
      title,
      amount,
      description,
      category,
      userId
    }
  )

  res.redirect('/expenses')
}

const showEditExpenseForm = async (req, res, next) => {
  const userId = req.user.id
  const expenseId = req.params.id

  const expense = await Expense.findOne({
    userId,
    _id: expenseId
  }).populate('userId', 'name')

  // TODO: Create categories schema model
  const categories = CATS

  return res.render('expenses/expenseForm', {
    expense,
    categories,
    page: {
      title: 'Edit Expense',
      formAction: `/expenses/update/${expenseId}`
    }
  })
}

const updateExpense = async (req, res, next) => {
  //TODO: Update job in db
  const userId = req.user.id;
  const {
    body: { id: expenseId, title, amount, description, category },
  } = req;

  const expense = await Expense.findByIdAndUpdate(
    {
      _id: expenseId,
      userId
    },
    {
      title,
      amount,
      description,
      category,
    },
    {
      new: true,
      runValidators: true
    }
  )

  res.redirect('/expenses')
}

const deleteExpense = async (req, res, next) => {
  //TODO: Delete job from db
  const userId = req.user.userId
  const expenseId = req.params.id

  const expense = await Expense.findByIdAndDelete(
    {
      _id: expenseId,
      userId
    }
  )

  res.redirect('/expenses')
}

module.exports = {
  allExpenses,
  addExpense,
  showAddExpenseForm,
  showEditExpenseForm,
  updateExpense,
  deleteExpense,
}
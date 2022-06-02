import { createContext, useReducer } from 'react';
import { DUMMY_EXPENSES } from '../components/ExpensesOutput/dummyData';

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	updateExpense: (id, { description, amount, date }) => {},
	deleteExpense: (id) => {},
});

function expensesReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			return [action.payload, ...state];
		case 'SET':
			const inverted = action.payload.reverse();
			return inverted;
		case 'UPDATE':
			const updatableExpenseIndex = state.findIndex(
				(expense) => expense.id === action.payload.id
			);
			const updatableExpense = state[updatableExpenseIndex];
			const updatedItem = { ...updatableExpense, ...action.payload.data };
			const updatedExpenses = [...state];
			updatedExpenses[updatableExpenseIndex] = updatedItem;
			return updatedExpenses;
		case 'DELETE':
			return state.filter((expense) => expense.id !== action.payload);
		default:
			return state;
	}
}

function ExpensesContextProvider({ children }) {
	const [expensesState, dispatch] = useReducer(expensesReducer, []);

	function addExpense(expenseData) {
		dispatch({ type: 'ADD', payload: expenseData });
	}

	function setExpenses(expenses) {
		dispatch({ type: 'SET', payload: expenses });
	}

	function updateExpense(id, expenseData) {
		dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
	}

	function deleteExpense(id) {
		dispatch({ type: 'DELETE', payload: id });
	}

	const value = {
		expenses: expensesState,
		addExpense: addExpense,
		setExpenses: setExpenses,
		deleteExpense: deleteExpense,
		updateExpense: updateExpense,
	};

	return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;

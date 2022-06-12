import axios from 'axios';

const BACKEND_URL =
	'https://muneem-3ed5f-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function storeExpense(expenseData) {
	const response = await axios.post(
		BACKEND_URL + '/user1/transactions.json',
		expenseData
	);
	const id = response.data.name;
	return id;
}

export async function fetchExpenses() {
	const response = await axios.get(BACKEND_URL + '/user1/transactions.json');
	const expenses = [];

	for (const key in response.data) {
		const expenseObj = {
			id: key,
			title: response.data[key].title,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			category: response.data[key].category,
			account: response.data[key].account,
			isExpense: response.data[key].isExpense,
			description: response.data[key].description,
		};
		expenses.push(expenseObj);
	}

	return expenses;
}

export async function fetchAll() {
	const response = await axios.get(BACKEND_URL + '/user1.json');

	return response.data;
}

export function updateExpense(id, expenseData) {
	return axios.put(BACKEND_URL + `/user1/transactions/${id}.json`, expenseData);
}

export function updateBudget(name, obj) {
	return axios.put(BACKEND_URL + `/user1/categories/${name}.json`, obj);
}

export function deleteExpense(id) {
	return axios.delete(BACKEND_URL + `/user1/transactions/${id}.json`);
}

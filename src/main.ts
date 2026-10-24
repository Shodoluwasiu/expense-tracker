const total = document.getElementById('total') as HTMLSpanElement;
total.textContent = '0';

const form = document.getElementById('expense-form') as HTMLFormElement;
const title = document.getElementById('title') as HTMLInputElement;
const amount = document.getElementById('amount') as HTMLInputElement;
const category = document.getElementById('category') as HTMLSelectElement;
//const amountValue = Number(amount.value);

//define the Expense interface
interface Expense {
  id: number;  
  title: string;
  amount: number;
  category: string;
  }

//expenses array to store the expenses
 const expenses: Expense[] = [];
 
 

form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const amountValue = Number(amount.value);

  if (title.value.trim() === "" || isNaN(amountValue) || amountValue <= 0) {
   return;
 }

//Adding record to the expenses array
const newExpense: Expense = {
  id: Date.now(),      
  title: title.value,
  amount: amountValue,
  category: category.value,
};
expenses.push(newExpense);
console.log(expenses);
});

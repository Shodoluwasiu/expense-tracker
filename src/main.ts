const total = document.getElementById("total") as HTMLSpanElement;
 

const form = document.getElementById("expense-form") as HTMLFormElement;
const title = document.getElementById("title") as HTMLInputElement;
const amount = document.getElementById("amount") as HTMLInputElement;
const category = document.getElementById("category") as HTMLSelectElement;
const list = document.getElementById("expense-list") as HTMLUListElement;
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

//checking if text is empty or not and if the amount is a number and greater than 0
form.addEventListener("submit", (event) => {
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
  saveExpenses();
  renderExpenses();
  updateTotal();
  form.reset();
});

//Adding the expenses to the list
function renderExpenses() {
  list.innerHTML = "";

  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.textContent = `${expense.title} - $${expense.amount} (${expense.category})`;
    list.appendChild(li);
  });
}

//Add running total of the expenses
function updateTotal() {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  total.textContent = totalAmount.toFixed(2);
}

//function to save the expenses to local storage
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
//function to load the expenses from local storage
function loadExpenses() {
  const readExpenses = localStorage.getItem("expenses");
  if (readExpenses) {
    try {
      expenses.push(...JSON.parse(readExpenses));
    } catch (error) {
      console.error("Error parsing saved expenses:", error);
    }
  }
}

loadExpenses();
renderExpenses();
updateTotal();

let expenses = [];
let totalAmount = 0;
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
    updateExpensesList();
}

function updateExpensesList() {
    expenseTableBody.innerHTML = '';
    totalAmount = 0;
    expenses.forEach((expense, index) => {
        const newRow = expenseTableBody.insertRow();

        const nameCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const editCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function () {
            let newAmount = prompt('Enter new amount:');
            if (newAmount !== null && newAmount.trim() !== '') {
                if (!newAmount.startsWith('+')) {
                    newAmount = '+' + newAmount;
                }
                try {
                    const oldAmount = expenses[index].amount;
                    newAmount = eval(`(${oldAmount}) ${newAmount}`);
                    if (!isNaN(newAmount)) {
                        totalAmount = totalAmount - oldAmount + newAmount;
                        totalAmountCell.textContent = totalAmount.toFixed(2);
                        expenses[index].amount = parseFloat(newAmount);
                        localStorage.setItem('expenses', JSON.stringify(expenses));
                        updateExpensesList();
                    } else {
                        throw new Error('Invalid arithmetic expression');
                    }
                } catch (error) {
                    alert('Invalid input. Please enter a valid arithmetic expression.');
                }
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            const deletedAmount = expenses[index].amount;
            totalAmount -= deletedAmount;
            totalAmountCell.textContent = totalAmount.toFixed(2);
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            updateExpensesList();
        });

        nameCell.textContent = expense.name;
        amountCell.textContent = expense.amount.toFixed(2);
        dateCell.textContent = formatDate(expense.date);
        editCell.appendChild(editBtn);
        deleteCell.appendChild(deleteBtn);

        totalAmount += expense.amount;
        totalAmountCell.textContent = totalAmount.toFixed(2);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function addExpense(name, amount, date) {
    const existingExpenseIndex = expenses.findIndex(expense => expense.name.toLowerCase() === name.toLowerCase());
    if (existingExpenseIndex !== -1) {
        expenses[existingExpenseIndex].amount += parseFloat(amount);
    } else {
        expenses.push({ name, amount: parseFloat(amount), date });
    }
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateExpensesList();
}

document.getElementById('add-btn').addEventListener('click', function () {
    const name = document.getElementById('name-input').value.trim();
    const amount = document.getElementById('amount-input').value.trim();
    const date = document.getElementById('date-input').value.trim();

    if (name === '' || amount === '' || date === '') {
        alert('Please fill out all mandatory fields correctly');
        return;
    }

    addExpense(name, amount, date);

    document.getElementById('name-input').value = '';
    document.getElementById('amount-input').value = '';
    document.getElementById('date-input').value = '';
});

function resetData() {
    localStorage.removeItem('expenses');
    expenses = [];
    totalAmount = 0;
    totalAmountCell.textContent = '0.00';
    updateExpensesList();
}

let token = localStorage.getItem('token');
const API_URL = '/api';

if (token) {
    showExpenseSection();
}

function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}

function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

async function register() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const res = await fetch(`${API_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        if (res.ok) {
            alert('Registration successful! Please login.');
            showLogin();
        } else {
            const data = await res.json();
            document.getElementById('registerError').textContent = JSON.stringify(data);
        }
    } catch (err) {
        document.getElementById('registerError').textContent = 'Registration failed';
    }
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) {
            const data = await res.json();
            token = data.access;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            showExpenseSection();
        } else {
            document.getElementById('loginError').textContent = 'Invalid credentials';
        }
    } catch (err) {
        document.getElementById('loginError').textContent = 'Login failed';
    }
}

function logout() {
    token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    document.getElementById('authSection').classList.remove('hidden');
    document.getElementById('expenseSection').classList.add('hidden');
    showLogin();
}

function showExpenseSection() {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('expenseSection').classList.remove('hidden');
    document.getElementById('username').textContent = localStorage.getItem('username');
    document.getElementById('date').valueAsDate = new Date();
    loadExpenses();
    loadSummary();
}

async function addExpense() {
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    if (!amount || !category || !date) {
        document.getElementById('expenseError').textContent = 'Please fill all required fields';
        return;
    }

    try {
        const res = await fetch(`${API_URL}/expenses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, category, description, date })
        });
        if (res.ok) {
            document.getElementById('expenseSuccess').textContent = 'Expense added!';
            document.getElementById('expenseError').textContent = '';
            setTimeout(() => document.getElementById('expenseSuccess').textContent = '', 3000);
            document.getElementById('amount').value = '';
            document.getElementById('category').value = '';
            document.getElementById('description').value = '';
            loadExpenses();
            loadSummary();
        } else {
            const data = await res.json();
            document.getElementById('expenseError').textContent = 'Error: ' + JSON.stringify(data);
        }
    } catch (err) {
        document.getElementById('expenseError').textContent = 'Failed to add expense: ' + err.message;
    }
}

async function loadExpenses() {
    const category = document.getElementById('filterCategory').value;
    const start = document.getElementById('filterStart').value;
    const end = document.getElementById('filterEnd').value;
    
    let url = `${API_URL}/expenses/?`;
    if (category) url += `category=${category}&`;
    if (start) url += `start_date=${start}&`;
    if (end) url += `end_date=${end}&`;

    try {
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        const tbody = document.getElementById('expenseList');
        
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">No expenses found. Add your first expense above!</td></tr>';
            return;
        }
        
        tbody.innerHTML = data.map(exp => `
            <tr>
                <td>${exp.date}</td>
                <td>${exp.category}</td>
                <td>${exp.description || '-'}</td>
                <td><strong>$${parseFloat(exp.amount).toFixed(2)}</strong></td>
                <td><button class="btn-danger" onclick="deleteExpense(${exp.id})">Delete</button></td>
            </tr>
        `).join('');
    } catch (err) {
        console.error('Failed to load expenses', err);
    }
}

async function deleteExpense(id) {
    if (!confirm('Delete this expense?')) return;
    try {
        await fetch(`${API_URL}/expenses/${id}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadExpenses();
        loadSummary();
    } catch (err) {
        alert('Failed to delete expense');
    }
}

async function loadSummary() {
    try {
        const res = await fetch(`${API_URL}/expenses/summary/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        document.getElementById('summary').innerHTML = `
            <strong>📊 Monthly Summary:</strong> 
            Total Spent: <strong style="font-size: 1.3rem; color: #667eea;">$${parseFloat(data.total_amount || 0).toFixed(2)}</strong> | 
            Total Expenses: <strong>${data.expense_count || 0}</strong>
        `;
    } catch (err) {
        console.error('Failed to load summary', err);
    }
}

function clearFilters() {
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterStart').value = '';
    document.getElementById('filterEnd').value = '';
    loadExpenses();
}

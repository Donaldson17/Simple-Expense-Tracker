# Simple Expense Tracker API

A Django REST Framework backend for tracking user expenses with authentication.

## Features
- User registration & login (JWT authentication)
- Add, view, update, delete expenses
- Filter expenses by date range or category
- Users can only access their own expenses
- Monthly expense summary

## Tech Stack
- Django 4.2
- Django REST Framework
- JWT Authentication
- SQLite Database

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

3. Create superuser (optional):
```bash
python manage.py createsuperuser
```

4. Run server:
```bash
python manage.py runserver
```

## API Endpoints

### Authentication
- `POST /api/register/` - Register new user
- `POST /api/login/` - Login (get JWT tokens)
- `POST /api/token/refresh/` - Refresh access token

### Expenses
- `GET /api/expenses/` - List all user expenses (supports filtering)
- `POST /api/expenses/` - Create new expense
- `GET /api/expenses/{id}/` - Get expense detail
- `PUT /api/expenses/{id}/` - Update expense
- `DELETE /api/expenses/{id}/` - Delete expense
- `GET /api/expenses/summary/` - Monthly expense summary

### Query Parameters for Filtering
- `?category=Food` - Filter by category
- `?start_date=2024-01-01` - Filter from date
- `?end_date=2024-12-31` - Filter to date
- `?start_date=2024-01-01&end_date=2024-01-31&category=Food` - Combined filters

## Example Usage

### Register
```bash
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "email": "john@example.com", "password": "securepass123"}'
```

### Login
```bash
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "securepass123"}'
```

### Add Expense
```bash
curl -X POST http://localhost:8000/api/expenses/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": "50.00", "category": "Food", "description": "Lunch", "date": "2024-01-15"}'
```

### View Expenses
```bash
curl -X GET http://localhost:8000/api/expenses/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Interview Talking Points

### Models
- **User-Expense Relationship**: One-to-Many (User has many Expenses)
- **ForeignKey**: Links each expense to its owner
- **on_delete=CASCADE**: Deletes expenses when user is deleted

### Serializers
- Convert complex data types (models) to JSON
- Handle validation automatically
- Separate serializers for different use cases (read vs write)

### HTTP Methods
- **GET**: Retrieve data
- **POST**: Create new resources
- **PUT/PATCH**: Update existing resources
- **DELETE**: Remove resources

### Authentication
- JWT tokens for stateless authentication
- Access token (short-lived) + Refresh token (long-lived)
- Token sent in Authorization header

### Permissions
- IsAuthenticated: Only logged-in users can access
- Object-level permissions: Users see only their own expenses

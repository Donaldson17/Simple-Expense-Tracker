import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'expense_tracker.settings')

import django
django.setup()

from expense_tracker.wsgi import application
app = application

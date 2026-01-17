import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'expense_tracker.settings')

# Add the project directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Setup Django
django.setup()

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# Vercel handler
app = application

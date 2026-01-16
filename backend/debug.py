import os
import sys
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
try:
    django.setup()
    from django.core.management import call_command
    call_command('check')
except Exception as e:
    import traceback
    traceback.print_exc()

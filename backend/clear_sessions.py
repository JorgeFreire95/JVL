
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import ActiveSession

def clear_sessions():
    count = ActiveSession.objects.count()
    ActiveSession.objects.all().delete()
    print(f"Eliminadas {count} sesiones activas.")

if __name__ == '__main__':
    clear_sessions()

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
username = 'admin_panel'
email = 'admin@panel.com'
password = 'Admin@123'

if not User.objects.filter(username=username).exists():
    user = User.objects.create_user(username=username, email=email, password=password)
    user.is_staff = True
    user.save()
    print(f'✓ Usuario {username} creado exitosamente')
    print(f'Username: {username}')
    print(f'Password: {password}')
    print(f'Email: {email}')
else:
    print(f'El usuario {username} ya existe')

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
username = 'django_admin'
email = 'django@admin.com'
password = 'Django@2025'

if not User.objects.filter(username=username).exists():
    user = User.objects.create_superuser(username=username, email=email, password=password)
    print(f'✓ Superusuario {username} creado exitosamente')
    print(f'Username: {username}')
    print(f'Password: {password}')
    print(f'Email: {email}')
    print(f'\nPuede acceder en: http://localhost:8000/admin/')
else:
    print(f'El usuario {username} ya existe')
    # Opcionalmente, actualizar la contraseña si ya existe
    user = User.objects.get(username=username)
    user.set_password(password)
    user.save()
    print(f'Contraseña actualizada para {username}')
    print(f'Nueva contraseña: {password}')

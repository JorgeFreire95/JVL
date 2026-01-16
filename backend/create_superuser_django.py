import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Datos del superusuario
username = 'superadmin'
email = 'superadmin@iglesia.com'
password = 'SuperAdmin@2025'

# Crear el superusuario
if not User.objects.filter(username=username).exists():
    user = User.objects.create_superuser(
        username=username,
        email=email,
        password=password
    )
    print(f'✓ Superusuario creado exitosamente')
    print(f'Username: {username}')
    print(f'Email: {email}')
    print(f'Contraseña: {password}')
    print(f'\nAcceso al panel Django: http://localhost:8000/admin/')
else:
    print(f'El usuario {username} ya existe')
    user = User.objects.get(username=username)
    user.set_password(password)
    user.is_superuser = True
    user.is_staff = True
    user.save()
    print(f'✓ Contraseña actualizada para {username}')
    print(f'Nueva contraseña: {password}')

#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User

user = User.objects.get(username='administrador')
print(f"Usuario: {user.username}")
print(f"Email: {user.email}")
print(f"is_staff: {user.is_staff}")

print("\nProbando contraseñas:")
for pwd in ['admin123', 'administrador', 'admin', '123456', 'password']:
    result = user.check_password(pwd)
    print(f"  {pwd}: {result}")
    if result:
        print(f"✓ Contraseña correcta: {pwd}")
        break
else:
    print("\n✗ Ninguna contraseña funciona. Reseteando contraseña...")
    user.set_password('admin123')
    user.save()
    print("✓ Contraseña reseteada a: admin123")

#!/usr/bin/env python
"""
Script para probar la API de login
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User

# Obtener credenciales del administrador
admin_user = User.objects.get(username='administrador')

print(f"Probando login para: {admin_user.email}")
print(f"Username: {admin_user.username}")
print(f"is_staff: {admin_user.is_staff}")

# La contraseña por defecto es la misma que el username
test_password = 'administrador'

print(f"\nIntentando verificar contraseña...")
if admin_user.check_password(test_password):
    print("✓ La contraseña es correcta")
else:
    print("✗ La contraseña es incorrecta")
    print("Probando otras contraseñas comunes...")
    for pwd in ['admin', '123456', 'password', 'admin123', admin_user.username]:
        if admin_user.check_password(pwd):
            print(f"✓ La contraseña correcta es: {pwd}")
            break
    else:
        print("No se encontró la contraseña válida")

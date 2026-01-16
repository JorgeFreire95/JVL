#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import ActiveSession

# Eliminar todas las sesiones activas
ActiveSession.objects.all().delete()
print("✓ Sesiones activas eliminadas")

# Verificar usuarios
users = User.objects.filter(is_staff=True)
for u in users:
    print(f"\nUsuario: {u.username}")
    print(f"  Email: {u.email}")
    print(f"  is_staff: {u.is_staff}")

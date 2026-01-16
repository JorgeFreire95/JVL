#!/usr/bin/env python
"""
Script para cerrar la sesión del administrador
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import ActiveSession

# Buscar al usuario administrador (is_staff=True)
admin_users = User.objects.filter(is_staff=True)

if admin_users.exists():
    for admin in admin_users:
        print(f"Cerrando sesión de: {admin.username}")
        
        # Eliminar todas las sesiones activas del administrador
        sessions = ActiveSession.objects.filter(user=admin)
        if sessions.exists():
            count = sessions.count()
            sessions.delete()
            print(f"  ✓ {count} sesión(es) eliminada(s)")
        else:
            print(f"  No hay sesiones activas")
    
    print("\n✓ Sesiones del administrador cerradas exitosamente")
else:
    print("No se encontraron usuarios administrador")

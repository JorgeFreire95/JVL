import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission

User = get_user_model()

# Obtener todos los permisos
all_permissions = Permission.objects.all()

# Obtener todos los usuarios con is_staff=True (administradores)
admin_users = User.objects.filter(is_staff=True)

print(f"Total de permisos disponibles: {all_permissions.count()}")
print(f"Usuarios administradores encontrados: {admin_users.count()}\n")

for user in admin_users:
    # Agregar todos los permisos al usuario
    user.user_permissions.set(all_permissions)
    user.is_superuser = True
    user.save()
    print(f"✓ Usuario '{user.username}' actualizado:")
    print(f"  - Superusuario: Sí")
    print(f"  - Permisos: {user.user_permissions.count()}")
    print()

print("✓ Todos los usuarios administradores han sido actualizados con permisos completos.")

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from api.models import Announcement, ContactCard

User = get_user_model()

# Usuario a mantener
user_to_keep_email = 'admin@iglesia.com'

print("Iniciando limpieza de base de datos...")
print(f"Usuarios a mantener: {user_to_keep_email}\n")

# Eliminar todos los anuncios
announcements_deleted = Announcement.objects.all().count()
Announcement.objects.all().delete()
print(f"✓ Anuncios eliminados: {announcements_deleted}")

# Eliminar todos los contactos
contacts_deleted = ContactCard.objects.all().count()
ContactCard.objects.all().delete()
print(f"✓ Contactos eliminados: {contacts_deleted}")

# Contar usuarios antes de la limpieza
users_before = User.objects.all().count()

# Eliminar todos los usuarios excepto el especificado
users_deleted = 0
for user in User.objects.all():
    if user.email != user_to_keep_email:
        user.delete()
        users_deleted += 1

print(f"✓ Usuarios eliminados: {users_deleted} de {users_before}")

# Verificar usuario restante
remaining_user = User.objects.filter(email=user_to_keep_email).first()
if remaining_user:
    print(f"\n✓ Usuario restante:")
    print(f"  - Email: {remaining_user.email}")
    print(f"  - Username: {remaining_user.username}")
    print(f"  - Es administrador: {remaining_user.is_staff}")
    print(f"  - Es superusuario: {remaining_user.is_superuser}")
else:
    print(f"\n✗ Error: No se encontró usuario con email {user_to_keep_email}")

print("\n✓ Limpieza completada exitosamente.")

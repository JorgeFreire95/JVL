import os
import django
import hashlib

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def get_md5_hash(text):
    """Genera el hash MD5 de un texto"""
    return hashlib.md5(text.encode()).hexdigest()

print("=" * 60)
print("INFORMACIÓN DE USUARIOS Y CONTRASEÑAS MD5")
print("=" * 60)

users = User.objects.all()

for user in users:
    print(f"\nUsuario: {user.username}")
    print(f"Email: {user.email}")
    print(f"Es Administrador: {user.is_staff}")
    print(f"Es Superusuario: {user.is_superuser}")
    
    # Para mostrar la contraseña MD5 de la contraseña por defecto
    default_password = "admin123"
    print(f"MD5 de 'admin123': {get_md5_hash(default_password)}")
    print("-" * 60)

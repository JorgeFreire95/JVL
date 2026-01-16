import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

User = get_user_model()

def populate_users():
    users_data = [
        {'username': 'carlos_lopez', 'email': 'carlos@ejemplo.com', 'password': 'password123', 'is_staff': False},
        {'username': 'ana_martinez', 'email': 'ana@ejemplo.com', 'password': 'password123', 'is_staff': False},
        {'username': 'roberto_gomez', 'email': 'roberto@ejemplo.com', 'password': 'password123', 'is_staff': True},
        {'username': 'lucia_fernandez', 'email': 'lucia@ejemplo.com', 'password': 'password123', 'is_staff': False},
        {'username': 'miguel_torres', 'email': 'miguel@ejemplo.com', 'password': 'password123', 'is_staff': False},
    ]

    print("Creando usuarios de prueba...")
    for data in users_data:
        if not User.objects.filter(username=data['username']).exists():
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password']
            )
            user.is_staff = data['is_staff']
            user.save()
            role = "Administrador" if data['is_staff'] else "Usuario"
            print(f"Usuario creado: {data['username']} ({role})")
        else:
            print(f"Usuario ya existe: {data['username']}")

if __name__ == '__main__':
    populate_users()

import os
import django
import requests

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

def test_create_user():
    url = 'http://localhost:8000/api/users/'
    data = {
        'username': 'test_user_unique_123',
        'email': 'test@example.com',
        'password': 'password123',
        'is_staff': False
    }
    
    try:
        print(f"Intentando crear usuario: {data['username']}")
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            print("¡Éxito! Usuario creado.")
        else:
            print("Falló la creación.")
            
    except Exception as e:
        print(f"Error de conexión: {e}")

if __name__ == '__main__':
    test_create_user()

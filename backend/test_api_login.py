#!/usr/bin/env python
"""
Script para probar la API de login
"""

import json
import urllib.request
import urllib.error

print("Probando endpoint de login...")
print("=" * 60)

# URL de la API
url = "http://localhost:8000/api/login/"

# Credenciales
credentials = {
    "email": "admin@iglesia.com",
    "password": "admin123"
}

print(f"URL: {url}")
print(f"Email: {credentials['email']}")
print(f"Contraseña: {credentials['password']}")
print("=" * 60)

# Hacer la petición
try:
    data = json.dumps(credentials).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("✓ Login exitoso!")
        print(f"Status Code: {response.status}")
        print(f"Response:")
        print(json.dumps(result, indent=2, ensure_ascii=False))
        
except urllib.error.HTTPError as e:
    print(f"✗ Error HTTP {e.code}:")
    response_body = e.read().decode('utf-8')
    print(response_body)
    try:
        error_data = json.loads(response_body)
        print(json.dumps(error_data, indent=2, ensure_ascii=False))
    except:
        pass
        
except Exception as e:
    print(f"✗ Error: {e}")
    print(f"Tipo: {type(e).__name__}")

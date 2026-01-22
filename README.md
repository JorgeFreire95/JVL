# JVL - Plataforma Web para Iglesia

Sistema web completo para gestión de anuncios, contactos, eventos y usuarios de una iglesia. Incluye panel de administración responsivo, autenticación segura y API REST.

## 📋 Tabla de Contenidos

- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Credenciales de Acceso](#-credenciales-de-acceso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Características](#-características)
- [API Endpoints](#-api-endpoints)

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Librería para construir interfaces de usuario
- **React Router** - Enrutamiento de aplicaciones
- **Vite** - Build tool moderno y rápido
- **Axios** - Cliente HTTP para peticiones API
- **Lucide React** - Iconos vectoriales
- **CSS3** - Estilos responsivos con efectos 3D

### Backend
- **Django 5.2** - Framework web Python
- **Django REST Framework** - API REST
- **Django CORS Headers** - Manejo de CORS
- **SQLite3** - Base de datos
- **Python 3.13** - Lenguaje de programación

### Seguridad
- **Bcrypt** - Encriptación de contraseñas
- **MD5** - Hashing para referencia
- **Token de Sesión UUID** - Prevención de sesiones duplicadas
- **CSRF Protection** - Protección contra ataques CSRF

### Herramientas
- **Node.js** - Gestor de paquetes
- **npm** - Administrador de dependencias

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Python 3.8+** - [Descargar](https://www.python.org/downloads/)
- **Node.js 16+** - [Descargar](https://nodejs.org/)
- **Git** - [Descargar](https://git-scm.com/)

Verifica las versiones:
```bash
python --version
node --version
npm --version
```

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd JVL
```

### 2. Configurar Backend (Django)

#### 2.1 Crear entorno virtual
```bash
cd backend
python -m venv .venv

# En Windows
.venv\Scripts\activate

# En macOS/Linux
source .venv/bin/activate
```

#### 2.2 Instalar dependencias
```bash
pip install -r requirements.txt
```

#### 2.3 Aplicar migraciones
```bash
python manage.py migrate
```

#### 2.4 Crear superusuario (Django Admin)
```bash
python create_superuser_django.py
```

#### 2.5 Crear usuario administrador (Panel Web)
```bash
python create_admin_panel_user.py
```

#### 2.6 Dar permisos a usuarios administrativos
```bash
python grant_admin_permissions.py
```

#### 2.7 Iniciar servidor Django
```bash
python manage.py runserver 127.0.0.1:8000
```

El servidor estará disponible en `http://127.0.0.1:8000`

### 3. Configurar Frontend (React)

#### 3.1 Instalar dependencias
```bash
cd ..
npm install
```

#### 3.2 Iniciar servidor de desarrollo
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5173` o `http://localhost:5174`

---

## ⚙️ Configuración

### Variables de Entorno (Backend)

El archivo `config/settings.py` contiene las configuraciones:

```python
DEBUG = True  # Cambiar a False en producción
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

DATABASE = SQLite3  # Cambiar según necesidad
```

### Base de Datos

Django usa SQLite por defecto (`db.sqlite3`). Para usar otra base de datos:

```python
# En config/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # o mysql, oracle, etc.
        'NAME': 'nombre_bd',
        'USER': 'usuario',
        'PASSWORD': 'contraseña',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

## 📖 Uso

### Acceder a la Aplicación

#### Panel Web de Administración
- URL: `http://localhost:5173` (o 5174)
- Email: `admin@iglesia.com`
- Contraseña: `admin123`

#### Panel de Administración Django
- URL: `http://127.0.0.1:8000/admin/`
- Usuario: `superadmin`
- Contraseña: `SuperAdmin@2025`

### Funcionalidades Principales

#### 1. Anuncios
- Crear, editar y eliminar anuncios
- Categorizar por: Jóvenes, Iglesia General, Niños, Mujeres, Hombres
- Establecer fecha, hora y ubicación
- Agregar descripción detallada

#### 2. Eventos Realizados (Fotos)
- Crear cartas 3D con foto frontal y sermón al reverso
- Visualización interactiva con efecto "flip"
- Gestión completa desde el panel de admin
- Ideal para resumir predicaciones o eventos pasados

#### 3. Contactos
- Agregar miembros del equipo
- Incluir foto, nombre, rol
- Enlace directo a WhatsApp
- Organizar por orden de aparición

#### 4. Usuarios
- Crear nuevos usuarios (solo administradores)
- Editar perfiles de usuario
- Asignar rol de administrador
- Cambiar contraseñas

#### 5. Seguridad
- Login con correo electrónico
- Prevención de sesiones duplicadas
- Logout con limpieza de sesión
- Encriptación MD5 de contraseñas (referencia)

---

## 🔐 Credenciales de Acceso

### Usuario Administrador (Panel Web)
```
Email: admin@iglesia.com
Contraseña: admin123
MD5 de Contraseña: 0192023a7bbd73250516f069df18b500
```

### Superusuario (Django Admin)
```
Usuario: superadmin
Email: superadmin@iglesia.com
Contraseña: SuperAdmin@2025
```

### Panel de Administrador Web
```
Usuario: admin_panel
Email: admin@panel.com
Contraseña: Admin@123
```

---

## 📁 Estructura del Proyecto

```
JVL/
├── backend/
│   ├── api/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── tests.py
│   ├── config/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── manage.py
│   ├── db.sqlite3
│   ├── requirements.txt
│   └── scripts/
│       ├── create_admin_panel_user.py
│       ├── create_superuser_django.py
│       ├── grant_admin_permissions.py
│       └── clean_database.py
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── Announcements.jsx
│   │   ├── Photos.jsx
│   │   └── ...
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── public/
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## ✨ Características

### Frontend
- ✅ Diseño responsivo (Mobile, Tablet, Desktop)
- ✅ Navbar con hamburguesa en móviles
- ✅ Panel de administración con interfaz intuitiva
- ✅ Sección de "Fotos/Eventos" con tarjetas interactivas 3D/Flip
- ✅ Formularios validados
- ✅ Carga de imágenes
- ✅ Animaciones suaves

### Backend
- ✅ API REST completa
- ✅ Autenticación por email
- ✅ Sistema de sesiones único (sin duplicados)
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ CORS habilitado
- ✅ Documentación automática

### Seguridad
- ✅ Contraseñas encriptadas
- ✅ Protección CSRF
- ✅ Sesiones únicas por usuario
- ✅ Validación de permisos
- ✅ Hashing MD5 para referencia
- ✅ Tokens de sesión UUID

---

## 🔌 API Endpoints

### Autenticación
```
POST   /api/login/          - Iniciar sesión
POST   /api/logout/         - Cerrar sesión
```

### Anuncios
```
GET    /api/announcements/  - Listar anuncios
POST   /api/announcements/  - Crear anuncio
GET    /api/announcements/{id}/  - Obtener anuncio
PUT    /api/announcements/{id}/  - Actualizar anuncio
DELETE /api/announcements/{id}/  - Eliminar anuncio
```

### Contactos
```
GET    /api/contacts/       - Listar contactos
POST   /api/contacts/       - Crear contacto
GET    /api/contacts/{id}/  - Obtener contacto
PUT    /api/contacts/{id}/  - Actualizar contacto
DELETE /api/contacts/{id}/  - Eliminar contacto
```

### Eventos
```
GET    /api/events/         - Listar eventos
POST   /api/events/         - Crear evento
GET    /api/events/{id}/    - Obtener evento
PATCH  /api/events/{id}/    - Actualizar evento
DELETE /api/events/{id}/    - Eliminar evento
```

### Usuarios
```
GET    /api/users/          - Listar usuarios
POST   /api/users/          - Crear usuario
GET    /api/users/{id}/     - Obtener usuario
PATCH  /api/users/{id}/     - Actualizar usuario
DELETE /api/users/{id}/     - Eliminar usuario
```

---

## 🚀 Deployment

### Preparar para Producción

1. **Backend (Django)**
   ```bash
   # En settings.py
   DEBUG = False
   ALLOWED_HOSTS = ['tu-dominio.com']
   SECRET_KEY = 'tu-clave-secreta-aqui'
   
   # Usar base de datos PostgreSQL
   # Configurar variables de entorno
   ```

2. **Frontend (React)**
   ```bash
   npm run build
   # Servir la carpeta 'dist' con nginx o similar
   ```

3. **Servidor**
   - Usar Gunicorn para Django
   - Nginx como proxy inverso
   - SSL/TLS certificado

---

## 🐛 Troubleshooting

### Error: "Puerto 8000 en uso"
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

### Error: "CORS error"
Verificar `CORS_ALLOWED_ORIGINS` en `settings.py`. Asegúrate de incluir `http://127.0.0.1:xxxx`.

### Error: "Base de datos bloqueada"
```bash
rm db.sqlite3
python manage.py migrate
```

### Error: "Módulo no encontrado"
```bash
pip install -r requirements.txt
npm install
```

---

## 📞 Soporte y Contacto

Para reportar bugs o sugerencias, contacta al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👥 Contribuidores

- Desarrollador Principal: Jorge
- Fecha de actualización: 21 de Enero de 2026

---

## 📚 Referencias

- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://react.dev/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Vite Documentation](https://vitejs.dev/)

---

**Última actualización**: 21 de Enero de 2026

https://jorgefreire95.github.io/JVL/

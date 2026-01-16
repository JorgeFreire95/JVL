# Instrucciones de Uso - JVL Web App

## 🌐 Dos Versiones Disponibles

### 1. GitHub Pages (Versión de Demostración)
**URL:** https://JorgeFreire95.github.io/JVL/

- ✅ Visualización de contenido estático
- ✅ Página de inicio, anuncios, contactos
- ❌ **NO funciona**: Login, Panel de Administrador
- ❌ No tiene acceso a la API del backend

**Limitaciones:** GitHub Pages solo sirve contenido estático y no puede conectarse a servidores locales.

---

### 2. Versión Local (Funcionalidad Completa)
**URL:** http://localhost:5174/

Para ejecutar la versión local con todas las funciones:

```powershell
# Terminal 1 - Backend (Django)
cd backend
python -m venv .venv  # Si no existe
.venv\Scripts\Activate
python manage.py runserver

# Terminal 2 - Frontend (Vite)
npm run dev
```

**Acceso:** http://localhost:5174/

- ✅ Visualización de contenido
- ✅ **Login funcional**
- ✅ **Panel de Administrador**
- ✅ Gestión de anuncios, contactos y usuarios
- ✅ API conectada y funcional

---

## 🔐 Credenciales de Administrador

```
Email: admin@iglesia.com
Contraseña: admin123
```

---

## 📝 Flujo Completo en Versión Local

1. **Iniciar ambos servidores** (seguir instrucciones arriba)
2. **Ir a** http://localhost:5174/
3. **Navegar a** "Login" (botón en el menú)
4. **Ingresar credenciales:**
   - Email: `admin@iglesia.com`
   - Contraseña: `admin123`
5. **Acceso automático** al Panel de Administrador

---

## 🚀 Deployment

### Para GitHub Pages
```powershell
npm run deploy
```
El build se generará en `dist/` y se subirá automáticamente.

### Para Producción (Backend)
Necesitarías desplegar Django en un servidor como Heroku, Railway, etc.

---

## 🔧 Estructura del Proyecto

```
JVL/
├── frontend (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── package.json
│
└── backend (Django)
    ├── api/
    ├── config/
    ├── manage.py
    └── requirements.txt
```

---

## ⚠️ Notas Importantes

- El **panel de admin solo funciona en versión local**
- Solo **un administrador** puede tener sesión activa a la vez
- Los datos se guardan en `db.sqlite3` (base de datos local)
- Para producción, cambiar `DEBUG = False` en `backend/config/settings.py`

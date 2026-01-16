# Pasos para Desplegar el Backend en Railway

## 1. Crear Cuenta en Railway
- Ve a: https://railway.app/
- Regístrate con GitHub
- Autoriza Railway para acceder a tus repositorios

## 2. Crear Nuevo Proyecto
- Click en "New Project"
- Selecciona "Deploy from GitHub"
- Busca y selecciona el repositorio "JVL"
- Railway detectará automáticamente que es Django

## 3. Configurar Variables de Entorno
En la sección "Variables":
```
DEBUG=False
SECRET_KEY=generar-una-clave-segura-aqui
ALLOWED_HOSTS=jvl-backend.up.railway.app,localhost
CORS_ALLOWED_ORIGINS=https://JorgeFreire95.github.io,http://localhost:5174
DATABASE_URL=postgresql://...  (Railway lo generará automáticamente)
```

Para generar una SECRET_KEY segura:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## 4. Agregar Base de Datos PostgreSQL
- En Railway, click en "+ Add"
- Selecciona "PostgreSQL"
- Railway configurará automáticamente la variable DATABASE_URL

## 5. Deploy Automático
- Una vez configurado, Railway desplegará automáticamente cuando hagas push a GitHub
- El URL será algo como: https://jvl-backend.up.railway.app

## 6. Actualizar Frontend
Una vez tengas el URL de Railway, actualiza en `src/services/api.js`:
```javascript
API_URL = 'https://tu-app.up.railway.app/api';
```

## 7. Crear Usuario Administrador en Producción
```bash
railway run python manage.py createsuperuser
```

## Comandos Útiles de Railway
```bash
# Ver logs
railway logs

# Conectar a shell remoto
railway shell

# Ejecutar comandos en producción
railway run python manage.py migrate
```

## URL de tu Aplicación Completa
- Frontend: https://JorgeFreire95.github.io/JVL/
- Backend: https://jvl-backend.up.railway.app/
- API: https://jvl-backend.up.railway.app/api/

¡Listo! Ahora tendrás un sistema completamente funcional en línea.

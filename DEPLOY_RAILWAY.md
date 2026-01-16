# Desplegar Backend en Railway para GitHub Pages

Para que funcione completamente en GitHub Pages, necesitas desplegar el backend en Railway.

## Paso 1: Iniciar Sesión en Railway

1. Ve a https://railway.app/
2. Haz clic en "Start Project"
3. Selecciona "Deploy from GitHub repo"
4. Autoriza Railway con tu cuenta de GitHub

## Paso 2: Crear Nuevo Proyecto desde GitHub

1. En Railway, selecciona "New Project"
2. Elige "Deploy from GitHub repo"
3. Busca y selecciona el repositorio "JVL"
4. Railway detectará automáticamente que es Django

## Paso 3: Agregar PostgreSQL

1. En el dashboard de Railway, haz clic en "+ Add"
2. Selecciona "Provision PostgreSQL"
3. Railway configurará automáticamente la variable DATABASE_URL

## Paso 4: Configurar Variables de Entorno

En Railway, ve a "Variables" y añade:

```
DEBUG=False
SECRET_KEY=tu-clave-segura-aqui
ALLOWED_HOSTS=tu-app.up.railway.app,localhost
CORS_ALLOWED_ORIGINS=https://JorgeFreire95.github.io,http://localhost:5175
```

### Generar SECRET_KEY:

En tu máquina local:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## Paso 5: Deploy Automático

Railway desplegará automáticamente cuando:
- Hagas push a GitHub
- O cuando cambies las variables de entorno

Espera a que termine el deploy. Tu URL será: `https://tu-app.up.railway.app`

## Paso 6: Migrar Base de Datos

Una vez desplegado, Railway ejecutará automáticamente:
```
python manage.py migrate
python manage.py collectstatic --noinput
```

## Paso 7: Crear Superusuario en Producción (Opcional)

```bash
railway run python manage.py createsuperuser
```

## Verificar

1. Ve a https://tu-app.up.railway.app/api/
2. Deberías ver la API REST
3. Ve a GitHub Pages: https://JorgeFreire95.github.io/JVL/
4. Intenta login - ahora funcionará conectando con Railway

## Logs

Para ver logs de Railway:
```bash
railway logs
```

## Estado Actual

- ✅ Frontend desplegado en GitHub Pages
- ⏳ Backend listo para desplegar en Railway
- 🔗 API detectará automáticamente Railway cuando esté disponible

**Nota:** Mientras Railway no esté desplegado, GitHub Pages mostrará un mensaje de que no puede conectar al servidor.

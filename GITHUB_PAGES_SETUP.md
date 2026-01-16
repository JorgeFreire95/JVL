# Deploy a GitHub Pages - Instrucciones

## Pasos para completar el deploy:

1. **Crear un Personal Access Token en GitHub:**
   - Ve a: https://github.com/settings/tokens
   - Click en "Generate new token (classic)"
   - Dale permisos: `repo` y `workflow`
   - Copia el token

2. **Configurar el repositorio remoto:**
   ```powershell
   git remote add origin https://github.com/TU_USUARIO/JVL.git
   git branch -M main
   git push -u origin main
   ```

3. **Instalar gh-pages (optional, para auto-deploy):**
   ```powershell
   npm install --save-dev gh-pages
   ```

4. **Actualizar package.json:**
   ```json
   "homepage": "https://TU_USUARIO.github.io/JVL",
   "scripts": {
     ...
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

5. **Hacer deploy:**
   ```powershell
   npm run deploy
   ```

6. **En GitHub, ir a Settings > Pages y seleccionar "gh-pages" como rama**

Tu app estará disponible en: https://TU_USUARIO.github.io/JVL/

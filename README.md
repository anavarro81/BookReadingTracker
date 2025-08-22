## BookReadingTracker — Cómo arrancar el front y el back

Este fichero contiene comandos para arrancar la aplicación cliente (`front`) y el servidor (`back`) en Windows PowerShell.

Requisitos
- Tener Node.js y npm instalados.
- Ejecutar los comandos en PowerShell (Windows).

Comandos

### 1) Arrancar front + back (recomendado: abrir 2 ventanas PowerShell)
Puedes abrir dos ventanas PowerShell desde la raíz del proyecto y ejecutar en cada una:

```powershell
cd .\apps\front
npm run dev
```

```powershell
cd .\apps\back
npm run dev
```

Alternativa: desde la raíz puedes lanzar dos nuevas ventanas PowerShell automáticamente:

```powershell
Start-Process powershell -ArgumentList '-NoExit','-Command','cd "apps\front"; npm run dev'
Start-Process powershell -ArgumentList '-NoExit','-Command','cd "apps\back"; npm run dev'
```

### 2) Arrancar solo el front
Desde la carpeta del front:

```powershell
cd .\apps\front
npm run dev
```

O desde la raíz usando `--prefix`:

```powershell
npm --prefix .\apps\front run dev
```

### 3) Arrancar solo el back
Desde la carpeta del back:

```powershell
cd .\apps\back
npm run dev
```

O desde la raíz usando `--prefix`:

```powershell
npm --prefix .\apps\back run dev
```

Notas
- `npm run dev` en `apps/front` ejecuta `vite`.
- `npm run dev` en `apps/back` ejecuta `nodemon`.
- Si prefieres usar otra herramienta (por ejemplo `concurrently` o `npm-run-all`) puedes instalarla y añadir un script en la raíz para simplificar el arranque conjunto.

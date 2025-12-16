# 🛠️ Stack

- [**Astro**](https://astro.build/) - El framework web de la nueva época.
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript con sintaxis de tipado.
- [**Ninja Keys**](https://github.com/ssleptsov/ninja-keys) - Menu desplegable con atajos de teclado hecho en puro Javascript.

## 🚀 Empezar

npm install

### 1. Añade tu contenido

Edita el archivo `cv.json` para crear tu propio Portafolio/CV imprimible.  
También puedes usar un archivo `cv_english.json` para contenido en inglés.

> 📝 **Importante:** asegúrate de configurar correctamente el alias `@cv` en [`tsconfig.json`](./tsconfig.json).  
> El orden determina qué archivo se toma por defecto. Por ejemplo:
```astro
{
  "compilerOptions": {
    "paths": {
      "@cv": [
        "./cv.json",            // Español por defecto
        "/cv_english.json"    // Inglés alternativo
      ]
    }
  }
}
```

### 2. Configura Pages

Para que tu sitio Astro funcione correctamente en GitHub Pages, debes asegurarte de que tu archivo [astro.config.mjs](./astro.config.mjs) esté configurado con las rutas correctas:
```astro
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://johnathan23.github.io/portfolio-minimalist', // URL pública completa de tu sitio
  base: '/portfolio-minimalist/', // Ruta base (subdirectorio del repositorio)
});
```

### 3. Lanza el servidor de desarrollo

```bash
npm run dev
```

### 4. Abre [**http://localhost:4321/portfolio-minimalist/**](http://localhost:4321/portfolio-minimalist/) en tu navegador para ver el resultado 🚀

## 🧞 Comandos

|     | Comando          | Acción                                        |
| :-- | :--------------- | :-------------------------------------------- |
| ⚙️  | `dev` o `start` | Lanza un servidor de desarrollo local en  `localhost:4321`.  |
| ⚙️  | `build`          | Comprueba posibles errores y hace un empaquetado de producción en `./dist/`.      |
| ⚙️  | `preview`        | Vista previa en local `localhost:4321` |

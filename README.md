# PUNTOS - Connect the Dots Game

Un juego interactivo de conectar puntos con sonidos místicos y animaciones hermosas.

## 🚀 Deploy en Vercel

### Opción 1: Deploy con Git (Recomendado)

1. **Crear repositorio en GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - PUNTOS game"
   ```

2. **Subir a GitHub:**
   - Ve a github.com y crea un nuevo repositorio
   - Sigue las instrucciones para conectar tu repo local

3. **Deploy en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Import Project"
   - Conecta tu repositorio de GitHub
   - ¡Vercel hará deploy automáticamente!

### Opción 2: Deploy con Vercel CLI

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd C:\Users\horaciogu\Claude
   vercel
   ```

3. **Para producción:**
   ```bash
   vercel --prod
   ```

## 📁 Estructura del Proyecto

```
Claude/
├── index.html              # Archivo principal del juego
├── assets/                 # Recursos (SVGs)
│   ├── cat-outline.svg
│   └── cat-outline-final.svg
├── vercel.json            # Configuración de Vercel
├── .gitignore             # Archivos ignorados por Git
└── README.md              # Este archivo
```

## 🎮 Características

- Juego de conectar puntos con 95 puntos
- Sonidos místicos de arpa con acordes angelicales
- Animación final con melodía emotiva (inspirada en Einaudi)
- Transición suave al gato completo al finalizar
- Líneas con gradientes de colores entre puntos

## 🔄 Hacer Cambios Después del Deploy

Si usas Git + Vercel:
```bash
# Hacer cambios en tu código
git add .
git commit -m "Descripción de cambios"
git push

# Vercel hace deploy automáticamente!
```

Si usas Vercel CLI:
```bash
# Hacer cambios en tu código
vercel --prod
```

## 🎨 Créditos

Creado con Claude Code

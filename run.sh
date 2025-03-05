#!/bin/bash

echo " Iniciando configuración de la aplicación..."

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor, instálalo primero."
    exit 1
fi

# Detectar si estamos en Windows (Git Bash, WSL o Cygwin)
OS_TYPE=$(uname -s)
if [[ "$OS_TYPE" == "MINGW"* || "$OS_TYPE" == "CYGWIN"* || "$OS_TYPE" == "MSYS"* ]]; then
    echo "️ Ejecutando en Windows..."
    WIN_ENV=true
else
    echo " Ejecutando en Linux/macOS..."
    WIN_ENV=false
fi

# Nombres de los contenedores
BACKEND_CONTAINER_NAME="nest-notes-app"
FRONTEND_CONTAINER_NAME="react-notes-app"

# Construir y levantar la aplicación con Docker Compose
echo "⚙️ Construyendo y ejecutando la aplicación..."
docker-compose up --build -d

# Esperar unos segundos para que los servicios se inicien
sleep 6

# Verificar el estado del backend
if docker ps --format '{{.Names}}' | grep -q "^$BACKEND_CONTAINER_NAME$"; then
    echo "✅ Backend ($BACKEND_CONTAINER_NAME) está corriendo correctamente."
    echo " Accede a la API en: http://localhost:3000"
else
    echo "❌ Hubo un problema iniciando el backend ($BACKEND_CONTAINER_NAME)."
    docker logs "$BACKEND_CONTAINER_NAME"
fi

# Verificar el estado del frontend
if docker ps --format '{{.Names}}' | grep -q "^$FRONTEND_CONTAINER_NAME$"; then
    echo "✅ Frontend ($FRONTEND_CONTAINER_NAME) está corriendo correctamente."
    echo " Accede al frontend en: http://localhost:5173"
else
    echo "❌ Hubo un problema iniciando el frontend ($FRONTEND_CONTAINER_NAME)."
    docker logs "$FRONTEND_CONTAINER_NAME"
fi

# Mensaje adicional para Windows si usa Docker Desktop
if [ "$WIN_ENV" = true ]; then
    echo " Si usas Docker Desktop en Windows, asegúrate de que esté ejecutándose y que los contenedores no estén bloqueados."
fi
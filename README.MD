# Optimizar imagenes para la web con node

Estos scripts se encargan de obtener imagenes previamente cargadas en el proyecto en una carpeta *rootDir>images* y optimizarlas reduciendo su tamaño y creando varias versiones de la misma.

### Formatos soportados
- png
- webp

### scripts

```js
    "images:compress": "node src/compress.mjs", // comprime las imagenes
    "images:resize": "node src/resize.mjs", //redimenciona las imagenes en tres versiones [small, medium, large]
    "images": "npm run imagenes:compress && npm run imagenes:resize", // optimiza las imagenes de forma automatica
```

### Directorios
Los directorios de entrada y salida se pueden modificar dentro del archivo [dir.mjs](src/dir.mjs)

### Dependencias
- imagemin
- imagemin-pngquant
- imagemin-webp
- sharp

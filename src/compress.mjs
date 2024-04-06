import imagemin from "imagemin";
import imgMin_pngquant from "imagemin-pngquant";
import imgMin_webp from "imagemin-webp";
// directorios
import { compressDir, sourceDir } from "./dir.mjs";

const dir = `${sourceDir}/*.{webp,png}`;

// funcionalidad
(async () => {
  try {
    const filesResult = await imagemin([dir], {
      destination: compressDir,
      plugins: [imgMin_pngquant({quality: [ 0.6, 0.6 ]}), imgMin_webp({quality: 60})]
    });
    filesResult.forEach(fl => console.log(`[+][file destination] > ${fl.destinationPath}`));
  } catch (error) {
    console.error(`[Error al comprimir imagenes] ${error}`);
  }
})();
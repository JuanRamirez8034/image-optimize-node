// import sharp from "sharp";
import { readdirSync } from "fs";
import { compressDir } from "./dir.mjs";
import sharp from "sharp";

/**
 * Redimencionar imagene
 * @param {*} fileFullName nombre del archivo (a tratar) dentro del directorio
 * @returns true en caso de procesar correctamente el archivo
 */
const resizeOneImage = async (fileFullName='') => {
  // obteneindo el nombre de la imagen sin su extension
  const fileFullnameSplit = fileFullName.split(/[\.]+[a-z,0-9]/);
  if(fileFullnameSplit.length <= 0) throw '[Error: image name] Image name is undefined';
  const fileName = fileFullnameSplit[0];

  // evitando que la imagen ya haya sido procesado
  if(fileName.includes("small") || fileName.includes("medium") || fileName.includes("large")) throw `[Error: already processed image] "${fileFullName}"`;

  // objeto de procesamiento de imagen
  const image = sharp(`${compressDir}/${fileFullName}`);
  const { format:extension } = await image.metadata(); // formato/extension de la imagen

  // evitando imagenes con formatos/extensiones diferentes a webp y png
  if(!extension || (extension !== 'webp' && extension !== 'png')) throw `[Error: invalid image extension] Acepted ("png" or "webp") your file: "${fileFullName}"`;

  // creando imagen con dimension de ancho 450px
  image.resize(450).toFile(`${compressDir}/${fileName}-small.${extension}`);
  // creando imagen con dimension de ancho 750px
  image.resize(750).toFile(`${compressDir}/${fileName}-medium.${extension}`);
  // creando imagen con dimension de ancho 1800px
  image.resize(1800).toFile(`${compressDir}/${fileName}-large.${extension}`);

  return true;
};


async function main () {
  const filesFullNames = await readdirSync(compressDir);

  for await (let fileFullName of filesFullNames){
    try {
      const result = await resizeOneImage(fileFullName);
      if(result) console.log(`[+][File resize] > ${fileFullName}`);
    } catch (error) {
      console.log(`[-]${error}`);
    }
  }
}

main();
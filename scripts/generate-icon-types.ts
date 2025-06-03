import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.resolve(__dirname, "../src/assets/icons/");
const outputFile = path.resolve(__dirname, "../src/types/icon-names.ts");

console.log(iconsDir, outputFile);

const files = fs.readdirSync(iconsDir);
const iconNames = files
    .filter((f) => f.endsWith(".svg"))
    .map((f) => path.basename(f, ".svg"));

const typeDef = `export type IconName = ${iconNames.map((name) => `"${name}"`).join(" | ")};\n`;

fs.writeFileSync(outputFile, typeDef, "utf8");
console.log(`✅ Generated icon type with ${iconNames.length} entries.`);

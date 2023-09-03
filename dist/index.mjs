import fs from 'fs';
import path from 'path';

const { resolve, join } = path;
const { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } = fs;
function cleanFiles(config) {
  const rootDirectory = process.cwd();
  let dirPath, fileMatchPattern;
  if (typeof config === "string")
    dirPath = resolve(rootDirectory, config);
  else {
    dirPath = resolve(rootDirectory, config.dirPath);
    fileMatchPattern = config.fileMatchPattern;
  }
  if (existsSync(dirPath)) {
    const files = readdirSync(dirPath);
    files.forEach((file) => {
      if (fileMatchPattern && !file.match(fileMatchPattern))
        return;
      console.log(`Deleting ${file}`);
      const path2 = join(dirPath, file);
      if (statSync(path2).isDirectory()) {
        cleanFiles(path2);
        rmdirSync(path2);
      } else {
        unlinkSync(path2);
      }
    });
  }
}
const cleanPlugin = (_opt) => {
  const options = Object.assign(
    {
      targetFiles: ["dist"]
    },
    _opt
  );
  return {
    name: "vite-plugin-clean-pattern",
    enforce: "pre",
    apply: "build",
    buildStart: (config) => {
      const { targetFiles } = options;
      if (!targetFiles)
        return;
      if (Array.isArray(targetFiles)) {
        for (let i = 0, len = targetFiles.length; i < len; i++) {
          cleanFiles(targetFiles[i]);
        }
      } else {
        cleanFiles(targetFiles);
      }
    }
  };
};

export { cleanPlugin as default };

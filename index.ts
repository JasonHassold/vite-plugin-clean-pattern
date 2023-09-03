import fs from 'fs';
import path from 'path';
import type { PluginOption } from 'vite';

interface PatternConfig {
  dirPath: string;
  fileMatchPattern?: string;
}

interface ConfigOptions {
  targetFiles?: string[] | PatternConfig[];
}

const { resolve, join } = path;
const { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } = fs;

function cleanFiles(config: string | PatternConfig) {
  const rootDirectory = process.cwd();
  let dirPath: string, fileMatchPattern: string | undefined;

  if (typeof config === 'string') dirPath = resolve(rootDirectory, config);
  else {
    dirPath = resolve(rootDirectory, config.dirPath);
    fileMatchPattern = config.fileMatchPattern;
  }

  if (existsSync(dirPath)) {
    const files = readdirSync(dirPath);
    files.forEach((file) => {
      if (fileMatchPattern && !file.match(fileMatchPattern)) return;

      console.log(`Deleting ${file}`);

      const path = join(dirPath, file);
      if (statSync(path).isDirectory()) {
        cleanFiles(path);
        rmdirSync(path);
      } else {
        unlinkSync(path);
      }
    });
  }
}

const cleanPlugin = (_opt?: ConfigOptions): PluginOption => {
  const options: ConfigOptions = Object.assign(
    {
      targetFiles: ['dist'],
    },
    _opt
  );
  return {
    name: 'vite-plugin-clean-pattern',
    enforce: 'pre',
    apply: 'build',
    buildStart: (config) => {
      const { targetFiles } = options;
      if (!targetFiles) return;

      if (Array.isArray(targetFiles)) {
        for (let i = 0, len = targetFiles.length; i < len; i++) {
          cleanFiles(targetFiles[i]);
        }
      } else {
        cleanFiles(targetFiles);
      }
    },
  };
};

export default cleanPlugin;

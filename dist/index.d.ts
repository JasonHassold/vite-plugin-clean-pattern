import { PluginOption } from 'vite';

interface PatternConfig {
    dirPath: string;
    fileMatchPattern?: string;
}
interface ConfigOptions {
    targetFiles?: string[] | PatternConfig[];
}
declare const cleanPlugin: (_opt?: ConfigOptions) => PluginOption;

export = cleanPlugin;

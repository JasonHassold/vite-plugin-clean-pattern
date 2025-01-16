# vite-plugin-clean-pattern

[![npm](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=1.0.0&x2=0)](https://github.com/JasonHassold/vite-plugin-clean-pattern)

A vite plugin to remove/clean your build folder(s) using regex patterns to match specific files.

### Credit

Credit to flyfox (https://github.com/flyfox11) for their work on vite-plugin-cleaner (https://github.com/z-ti/vite-plugin-clean/tree/main) which this plugin is based on.

## Table of Contents

- [vite-plugin-clean-pattern](#vite-plugin-clean-pattern)
    - [Credit](#credit)
  - [Table of Contents](#table-of-contents)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Issues](#issues)
    - [License](#license)

### Installation

<a name="installation"></a>

```bash
  bun i --dev vite-plugin-clean-pattern
```

```bash
  npm i --save-dev vite-plugin-clean-pattern
```

```bash
  yarn add --dev vite-plugin-clean-pattern
```

### Usage

<a name="usage"></a>

Here's an example vite config illustrating how to use this plugin

**vite.config.js**
```js
import cleanPlugin from 'vite-plugin-clean-pattern';
export default {
  plugins: [cleanPlugin()],
}
```
<h2 align="center">Options</h2>

You can pass a hash of configuration options to `vite-plugin-clean-pattern`.
Allowed values are as follows:

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`targetFiles`**|`{Array.<string>}`|`['dist']`|List of directories removed before packing the file|

Here's an example vite config illustrating how to use these options

**vite.config.js**
```js
import cleanPlugin from 'vite-plugin-clean-pattern';
export default {
  plugins: [cleanPlugin(
    {
      targetFiles: [{ dirPath: 'dist', fileMatchPattern: '^vite_.*_[0-9a-zA-Z-_]{8}' }, ...]
    }
  )],
}
```

### Issues

<a name="issues"></a>

If you encounter some problems during use, please click here [Issue Report](https://github.com/JasonHassold/vite-plugin-clean-pattern/issues)

### License

<a name="license"></a>

[MIT](https://github.com/JasonHassold/vite-plugin-clean-pattern/blob/master/LICENSE)

Copyright (c) 2023-present Jason Hassold

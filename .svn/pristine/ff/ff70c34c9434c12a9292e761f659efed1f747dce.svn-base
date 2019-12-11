# Pan 大佬的精简模板移植

因为完整版太多东西了 但是有些功能精简版又没有 所以移植了 固钉 过来 把原先本地路由改成了 后台路由 方便后续自己的使用

[在线查看效果](http://www.chmc.xyz:9528)

## 添加配置 eslint + pretter 配置采用 pan 大佬的规则

1. vs 安装插件 Prettier - Code formatter
2. npm i -D prettier npm i -D eslint-plu
3. 在 vs setting.json 配置 附上我自己的

```
{
    "workbench.iconTheme": "vscode-icons",
    "workbench.colorTheme": "Atom One Dark",
    "vsicons.dontShowNewVersionMessage": true,
    "editor.minimap.enabled": false,
    "breadcrumbs.enabled": true,
    "explorer.confirmDelete": false,
    "editor.fontSize": 16,
    "editor.quickSuggestions": {
        "strings": true
    },
    "files.autoSave": "onFocusChange",
    "editor.formatOnSave": true,
    "git.autorefresh": false,
    "git.enabled": false,
    "eslint.autoFixOnSave": true,
    "files.associations": {
        "*.vue": "vue"
    },
    "eslint.options": {
        "extensions": [
            ".js",
            ".vue"
        ]
    },
    "eslint.validate": [
        "javascript",
        {
            "language": "vue",
            "autoFix": true
        },
        "html",
        "vue"
    ],
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "**/dist": true
    },
    "emmet.syntaxProfiles": {
        "javascript": "jsx",
        "vue": "html",
        "vue-html": "html"
    },
    "eslint.alwaysShowStatus": true,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    // 格式化插件的配置
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            // 属性强制折行对齐
            "wrap_attributes": "force-aligned"
        }
    },
    "vetur.format.defaultFormatter": {
        "html": "prettier",
        "css": "prettier",
        "postcss": "prettier",
        "scss": "prettier",
        "less": "prettier",
        "js": "prettier",
        "ts": "prettier",
        "stylus": "stylus-supremacy"
    }
}
```

4. 在 vue.config.js module.exports 添加 module

```
module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, 'src')],
        options: {
          fix: true
        }
      }
    ]
  },
```

5. .eslintrc.js 配置一些内容

```
root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['vue'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
    ...
  }
```

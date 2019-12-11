# Pan 大佬的精简模板移植

因为完整版太多东西了 但是有些功能精简版又没有 所以移植了 固钉 过来 把原先本地路由改成了 后台路由 方便后续自己的使用

[在线查看效果](http://www.chmc.xyz:9528)


## Eslint在VsCode 中如何自动格式化
1. 首先先在vscode中安装插件   Eslint（自带）,Prettier-Code formatter(Esben Petersen) ,Vetur。
2. 更改vscode中的 setting.json 数据
> 以下是我的设置，可作参考
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
    "vetur.format.defaultFormatter.js": "prettier-eslint",
    "files.autoSave": "onFocusChange",
    "prettier.singleQuote": true,
    "prettier.semi": false,
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
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "semi": false,
            "singleQuote": true
        }
    },
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```
3. 接下来就是配置项目根目录下的 .eslintrc.js 文件，按照你自己的规则制定
4. 然后重启编译器


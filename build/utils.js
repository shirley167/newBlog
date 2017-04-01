const path = require('path'),					//引入 nodejs 中的path模块
    config = require('../config'),				//引入开发环境与发布环境配置
    ExtractTextPlugin = require('extract-text-webpack-plugin')

//导出assets文件夹路径
exports.assetsPath = (_path) => {
    let assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

//css加载器
exports.cssLoaders = (options) => {
    options = options || {}
    // generate loader string to be used with extract text plugin
    function generateLoaders(loaders) {
        let sourceLoader = loaders.map((loader) => {
            let extraParamChar
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
                extraParamChar = '&'
            } else {
                loader = loader + '-loader'
                extraParamChar = '?'
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: sourceLoader,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader', sourceLoader].join('!')
        }
    }

    // http://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = (options) => {
    let output = [], loaders = exports.cssLoaders(options)
    for (let extension in loaders) {
        let loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        })
    }
    return output
}

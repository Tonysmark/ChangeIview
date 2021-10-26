
const $ = require('gogocode');
const rules = require('../rules')
const path = require('path');
const fs = require('fs');

const inputPath = path.resolve(__dirname, './input.vue');
const outputPath = path.resolve(__dirname, './output.vue');
/**
 * 转换入口导出一个函数，按照如下函数签名
 * @param {*} fileInfo 包含 source 和 path 属性
 * @param {*} api 包含 gogocode 作为转换工具
 * @param {*} options 其他 option 由此传入
 * @returns {string} 返回转换后的代码
 */
 function transform (fileInfo, api, options) {
    const sourceCode = fileInfo.source;
    const $ = api.gogocode;
    const ast = $(sourceCode, { parseOptions: { language: 'vue' } });
    const outAst = rules.reduce((ast, rule) => rule(ast, options), ast);
    return outAst.generate();
};
fs.readFile(inputPath, function read(err, code) {
    if (err) {
        throw err;
    }
    const outputCode = transform(
        {
            source: code.toString(),
            path: inputPath
        },
        {
            gogocode: $
        },
        {}
    );

    fs.writeFile(outputPath, outputCode, function (err) {
        if (err) {
            throw err;
        }
        console.log('The file was saved!');
    });
});

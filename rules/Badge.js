module.exports = function (ast) {
    // TODO  颜色可以重新绑定
    return ast
        .find('<template></template>')
        .replace(
            `<Badge $$$1>$$$2</Badge>`,
            `<a-badge  $$$1>$$$2</a-badge>`
        )
        .root('sfc');
}
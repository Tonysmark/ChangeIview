module.exports = function (ast) {
    // TODO  颜色可以重新绑定
    return ast
        .find('<template></template>')
        .replace(
            `<Card $$$1>$$$2</Card>`,
            `<a-card  $$$1>$$$2</a-card>`
        )
        .root('sfc');
}
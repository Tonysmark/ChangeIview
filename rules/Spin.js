module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Spin $$$1>$$$2</Spin>`,
            `<a-spin $$$1>$$$2</a-spin>`
        )
        .root('sfc');
}
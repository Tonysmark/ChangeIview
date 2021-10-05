module.exports = function (ast) {
    // TODO
    return ast
        .find('<template></template>')
        .replace(
            `<Icon $$$1>$$$2</Icon>`,
            `<a-icon $$$1>$$$2</a-icon>`
        )
        .root('sfc');
}
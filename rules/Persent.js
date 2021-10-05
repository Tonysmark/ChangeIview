module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Progress $$$1>$$$2</Progress>`,
            `<a-progress $$$1>$$$2</a-progress>`
        )
        .root('sfc');
}
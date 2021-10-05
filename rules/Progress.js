module.exports = function (ast) {
    // TODO
    return ast
        .find('<template></template>')
        .replace(
            `<Progress $$$1>$$$2</Progress>`,
            `<a-progress $$$1>$$$2</a-progress>`
        )
        .root('sfc');
}
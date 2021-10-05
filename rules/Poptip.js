module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Poptip $$$1>$$$2</Poptip>`,
            `<a-popover $$$1>$$$2</a-popover>`
        )
        .root('sfc');
}
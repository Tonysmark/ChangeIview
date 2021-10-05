module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Avatar $$$1>$$$2</Avatar>`,
            `<a-avatar $$$1>$$$2</a-avatar>`
        )
        .root('sfc');
}
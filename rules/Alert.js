module.exports = function (ast) {
    // TODO
    return ast
        .find('<template></template>')
        .replace(
            `<Alert $$$1>$$$2</Alert>`,
            `<a-alert $$$1>$$$2</a-alert>`
        )
        .root('sfc');
}
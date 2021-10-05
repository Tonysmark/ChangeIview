module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Option $$$1>$$$2</Option>`,
            `<a-select-option $$$1>$$$2</a-select-option>`
        )
        .root('sfc');
}
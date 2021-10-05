module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Tooltip content="$_$" $$$1>$$$2</Tooltip>`,
            `<a-tooltip title="$_$" $$$1>$$$2</a-tooltip>`
        )
        .root('sfc');
}
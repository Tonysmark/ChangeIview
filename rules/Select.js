module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Select $$$1>$$$2</Select>`,
            `<a-select $$$1>$$$2</a-select>`
        )
        .replace(
            `<a-select @on-change="$_$" $$$1>$$$2</a-select>`,
            `<a-select @change="$_$" $$$1>$$$2</a-select>`,
        )
        .root('sfc');
}
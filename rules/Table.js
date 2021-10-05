module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Table $$$1>$$$2</Table>`,
            `<a-table $$$1>$$$2</a-table>`
        )
        .replace(
            `<a-table :data="$_$" $$$1>$$$2</a-table>`,
            `<a-table :data-source="$_$" $$$1>$$$2</a-table>`
        )
        .root('sfc');
}
module.exports = function (ast) {

    return ast
        .find('<template></template>')
        .replace(
            `<Tag $$$1>$$$2</Tag>`,
            `<a-tag  $$$1>$$$2</a-tag>`
        )
        .replace(
            `<a-tag  @on-close="$_$" $$$1>$$$2</a-tag>`,
            `<a-tag @close="$_$"  $$$1>$$$2</a-tag>`
        )
        .root('sfc');
}
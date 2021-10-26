module.exports = function (ast) {

    return ast
        .find('<template></template>')
        .replace(
            `<Tag $$$1>$$$2</Tag>`,
            `<a-tag  $$$1>$$$2</a-tag>`
        )
        .root('sfc');
}
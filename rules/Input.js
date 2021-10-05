module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Input $$$1>$$$2</Input>`,
            `<a-input $$$1>$$$2</a-input>`
        )
        .replace(
            `<a-input allowclear $$$1>$$$2</a-input>`,
            `<a-input allowClear $$$1>$$$2</a-input>`
        )
        .replace(
            `<a-input @on-enter="$_$" $$$1>$$$2</a-input>`,
            `<a-input @pressEnter="$_$" $$$1>$$$2</a-input>`
        )
        .replace(
            `<InputNumber $$$1>$$$2</InputNumber>`,
            `<a-input-number $$$1>$$$2</a-input-number>`
        )
        .root('sfc');
}
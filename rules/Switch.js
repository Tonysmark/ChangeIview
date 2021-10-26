module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<i-switch $$$1>$$$2</i-switch>`,
            `<a-switch $$$1>$$$2</a-switch>`
        )
        // :checked="courseForm.isSettop===1" @change="courseForm.isSettop=$event?1:0"
        .replace(
            `<a-switch @on-change="$_$" $$$1>$$$2</a-switch>`,
            `<a-switch @change="$_$" $$$1>$$$2</a-switch>`
        )
        .root('sfc');
}
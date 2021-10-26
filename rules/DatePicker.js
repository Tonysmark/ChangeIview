module.exports = function (ast) {
    // TODO 放弃 IView 中的 Option
    return ast
        .find('<template></template>')
        .replace(
            `<DatePicker type="daterange" @on-change="$_$" $$$1>$$$2</DatePicker>`,
            `<a-range-picker  @change="$_$" $$$1>$$$2</a-range-picker>`
        )
        .replace(
            `<DatePicker type="date" @on-change="$_$" $$$1>$$$2</DatePicker>`,
            `<a-date-picker  @change="$_$" $$$1>$$$2</a-date-picker>`
        )
        .root('sfc');
}
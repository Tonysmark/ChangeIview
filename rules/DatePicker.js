module.exports = function (ast) {
    // TODO
    return ast
        .find('<template></template>')
        .replace(
            `<DatePicker $$$1>$$$2</DatePicker>`,
            `<a-datepicker $$$1>$$$2</a-datepicker>`
        )
        .root('sfc');
}
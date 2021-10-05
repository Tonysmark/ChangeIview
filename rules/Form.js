module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Form $$$1>$$$2</Form>`,
            `<a-form-model $$$1>$$$2</a-form-model>`
        )
        .replace(
            `<FormItem $$$1>$$$2</FormItem>`,
            `<a-form-model-item $$$1>$$$2</a-form-model-item>`,
        )
        .replace(
            `<a-form-model :label-width="$_$" $$$1>$$$2</a-form-model>`,
            `<a-form-model :label-col="{span:2}" :wrapper-col="{span:22}" $$$1>$$$2</a-form-model>`,
        )
        .replace(
            `<a-form-model inline $$$1>$$$2</a-form-model>`,
            `<a-form-model layout="inline" $$$1>$$$2</a-form-model>`,
        )
        .replace(
            `<a-form-model label-position="$_$" $$$1>$$$2</a-form-model>`,
            `<a-form-model labelAlign="$_$" $$$1>$$$2</a-form-model>`,
        )
        .root('sfc');
}
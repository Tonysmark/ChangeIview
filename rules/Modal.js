module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Modal  $$$1>$$$2</Modal>`,
            `<a-modal  $$$1>$$$2</a-modal>`
        )
        .replace(
            `<a-modal @on-cancel="$_$" $$$1>$$$2</a-modal>`,
            `<a-modal  @cancel="$_$" $$$1>$$$2</a-modal>`
        )
        .replace(
            `<a-modal @on-ok="$_$" $$$1>$$$2</a-modal>`,
            `<a-modal  @ok="$_$" $$$1>$$$2</a-modal>`
        )
        .replace(
            `<a-modal :mask-closable="$_$" $$$1>$$$2</a-modal>`,
            `<a-modal  :maskClosable="$_$" $$$1>$$$2</a-modal>`
        )
        .replace(
            `<a-modal width="$_$" $$$1>$$$2</a-modal>`,
            `<a-modal  :width="$_$" $$$1>$$$2</a-modal>`
        )
        .replace(
            `<a-modal :footer-hide="true" $$$1>$$$2</a-modal>`,
            `<a-modal  :footer="null" $$$1>$$$2</a-modal>`
        )
        .replace(
            `<a-modal v-bind:footer-hide="true" $$$1>$$$2</a-modal>`,
            `<a-modal  :footer="null" $$$1>$$$2</a-modal>`
        )
        .root('sfc');
}
module.exports = function (ast) {
    return ast
        .find('<template></template>')
        // 第一次不成功 注释掉下面的重新跑一次
        .replace(
            `<Modal $$$1>$$$2</Modal>`,
            `<a-modal $$$1>$$$2</a-modal>`
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
        .replace(
            `<a-modal @on-visible-change="$_$" $$$1>$$$2</a-modal>`,
            `<a-modal afterClose="$_$" $$$1>$$$2</a-modal>`,
        )
        .find(`<a-modal :width="$_$1"></a-modal>`).each(item => {
            console.log("item : ", item.match)
            item.match[1].forEach(m => {
                m.value.match('vw') && (m.node.content = `'${m.node.content}'`)
                m.value.match('px') && (m.node.content = `'${m.node.content}'`)
            })
        })
        .root('sfc');
}
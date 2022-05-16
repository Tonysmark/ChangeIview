module.exports = function (ast) {
    // TODO
    return ast
        .find('<template></template>')
        .replace(
            `<Alert $$$1>$$$2</Alert>`,
            `<a-alert $$$1>$$$2</a-alert>`
        )
        .replace(
            `<a-alert  $$$1>$$$2</a-alert>`,
            `<a-alert  $$$1>
                <template #message>
                    <div class="d-flex">$$$2</div>
                </template>
            </a-alert>`
        )
        .root('sfc');
}
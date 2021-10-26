module.exports = function (ast) {
    // TODO 路由要变
    return ast
        .find('<template></template>')
        .replace(
            `<Breadcrumb $$$1>$$$2</Breadcrumb>`,
            `<a-breadcrumb $$$1>$$$2</a-breadcrumb>`
        )
        .replace(
            `<BreadcrumbItem $$$1>$$$2</BreadcrumbItem>`,
            `<a-breadcrumb-item $$$1>$$$2</a-breadcrumb-item>`
        )
        .root('sfc');
}